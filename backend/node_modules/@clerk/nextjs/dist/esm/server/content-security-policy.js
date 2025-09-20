import "../chunk-BUSYA2B4.js";
import { constants } from "@clerk/backend/internal";
class ContentSecurityPolicyDirectiveManager {
  /**
   * Creates a new ContentSecurityPolicyDirectiveSet with default values
   * @returns A new ContentSecurityPolicyDirectiveSet with default values
   */
  static createDefaultDirectives() {
    return Object.entries(this.DEFAULT_DIRECTIVES).reduce((acc, [key, values]) => {
      acc[key] = new Set(values);
      return acc;
    }, {});
  }
  /**
   * Checks if a value is a special keyword that requires quoting
   * @param value - The value to check
   * @returns True if the value is a special keyword
   */
  static isKeyword(value) {
    return this.KEYWORDS.has(value.replace(/^'|'$/g, ""));
  }
  /**
   * Formats a value according to CSP rules, adding quotes for special keywords
   * @param value - The value to format
   * @returns The formatted value
   */
  static formatValue(value) {
    const unquoted = value.replace(/^'|'$/g, "");
    return this.isKeyword(unquoted) ? `'${unquoted}'` : value;
  }
  /**
   * Handles directive values, ensuring proper formatting and special case handling
   * @param values - Array of values to process
   * @returns Set of formatted values
   */
  static handleDirectiveValues(values) {
    const result = /* @__PURE__ */ new Set();
    if (values.includes("'none'") || values.includes("none")) {
      result.add("'none'");
      return result;
    }
    values.forEach((v) => result.add(this.formatValue(v)));
    return result;
  }
}
/** Set of special keywords that require quoting in CSP directives */
ContentSecurityPolicyDirectiveManager.KEYWORDS = /* @__PURE__ */ new Set([
  "none",
  "self",
  "strict-dynamic",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline"
]);
/** Default CSP directives and their values */
ContentSecurityPolicyDirectiveManager.DEFAULT_DIRECTIVES = {
  "connect-src": [
    "self",
    "https://clerk-telemetry.com",
    "https://*.clerk-telemetry.com",
    "https://api.stripe.com",
    "https://maps.googleapis.com"
  ],
  "default-src": ["self"],
  "form-action": ["self"],
  "frame-src": [
    "self",
    "https://challenges.cloudflare.com",
    "https://*.js.stripe.com",
    "https://js.stripe.com",
    "https://hooks.stripe.com"
  ],
  "img-src": ["self", "https://img.clerk.com"],
  "script-src": [
    "self",
    ...process.env.NODE_ENV !== "production" ? ["unsafe-eval"] : [],
    "unsafe-inline",
    "https:",
    "http:",
    "https://*.js.stripe.com",
    "https://js.stripe.com",
    "https://maps.googleapis.com"
  ],
  "style-src": ["self", "unsafe-inline"],
  "worker-src": ["self", "blob:"]
};
function handleExistingDirective(mergedCSP, key, values) {
  if (values.includes("'none'") || values.includes("none")) {
    mergedCSP[key] = /* @__PURE__ */ new Set(["'none'"]);
    return;
  }
  const deduplicatedSet = /* @__PURE__ */ new Set();
  mergedCSP[key].forEach((value) => {
    deduplicatedSet.add(ContentSecurityPolicyDirectiveManager.formatValue(value));
  });
  values.forEach((value) => {
    deduplicatedSet.add(ContentSecurityPolicyDirectiveManager.formatValue(value));
  });
  mergedCSP[key] = deduplicatedSet;
}
function handleCustomDirective(customDirectives, key, values) {
  if (values.includes("'none'") || values.includes("none")) {
    customDirectives.set(key, /* @__PURE__ */ new Set(["'none'"]));
    return;
  }
  const formattedValues = /* @__PURE__ */ new Set();
  values.forEach((value) => {
    const formattedValue = ContentSecurityPolicyDirectiveManager.formatValue(value);
    formattedValues.add(formattedValue);
  });
  customDirectives.set(key, formattedValues);
}
function formatCSPHeader(mergedCSP) {
  return Object.entries(mergedCSP).sort(([a], [b]) => a.localeCompare(b)).map(([key, values]) => {
    const valueObjs = Array.from(values).map((v) => ({
      raw: v,
      formatted: ContentSecurityPolicyDirectiveManager.formatValue(v)
    }));
    return `${key} ${valueObjs.map((item) => item.formatted).join(" ")}`;
  }).join("; ");
}
function generateNonce() {
  const randomBytes = new Uint8Array(16);
  crypto.getRandomValues(randomBytes);
  const binaryString = Array.from(randomBytes, (byte) => String.fromCharCode(byte)).join("");
  return btoa(binaryString);
}
function buildContentSecurityPolicyDirectives(strict, host, customDirectives, nonce) {
  const directives = Object.entries(ContentSecurityPolicyDirectiveManager.DEFAULT_DIRECTIVES).reduce(
    (acc, [key, values]) => {
      acc[key] = new Set(values);
      return acc;
    },
    {}
  );
  directives["connect-src"].add(host);
  if (strict) {
    directives["script-src"].delete("http:");
    directives["script-src"].delete("https:");
    directives["script-src"].add("'strict-dynamic'");
    if (nonce) {
      directives["script-src"].add(`'nonce-${nonce}'`);
    }
  }
  if (customDirectives) {
    const customDirectivesMap = /* @__PURE__ */ new Map();
    Object.entries(customDirectives).forEach(([key, values]) => {
      const valuesArray = Array.isArray(values) ? values : [values];
      if (ContentSecurityPolicyDirectiveManager.DEFAULT_DIRECTIVES[key]) {
        handleExistingDirective(directives, key, valuesArray);
      } else {
        handleCustomDirective(customDirectivesMap, key, valuesArray);
      }
    });
    customDirectivesMap.forEach((values, key) => {
      directives[key] = values;
    });
  }
  return formatCSPHeader(directives);
}
function createContentSecurityPolicyHeaders(host, options) {
  var _a;
  const headers = [];
  const nonce = options.strict ? generateNonce() : void 0;
  let cspHeader = buildContentSecurityPolicyDirectives((_a = options.strict) != null ? _a : false, host, options.directives, nonce);
  if (options.reportTo) {
    cspHeader += "; report-to csp-endpoint";
    headers.push([constants.Headers.ReportingEndpoints, `csp-endpoint="${options.reportTo}"`]);
  }
  if (options.reportOnly) {
    headers.push([constants.Headers.ContentSecurityPolicyReportOnly, cspHeader]);
  } else {
    headers.push([constants.Headers.ContentSecurityPolicy, cspHeader]);
  }
  if (nonce) {
    headers.push([constants.Headers.Nonce, nonce]);
  }
  return {
    headers
  };
}
export {
  createContentSecurityPolicyHeaders,
  generateNonce
};
//# sourceMappingURL=content-security-policy.js.map