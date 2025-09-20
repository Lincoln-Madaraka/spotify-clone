import "../../chunk-BUSYA2B4.js";
import { headers } from "next/headers";
import React from "react";
import { PromisifiedAuthProvider } from "../../client-boundary/PromisifiedAuthProvider";
import { getDynamicAuthData } from "../../server/buildClerkProps";
import { mergeNextClerkPropsWithEnv } from "../../utils/mergeNextClerkPropsWithEnv";
import { isNext13 } from "../../utils/sdk-versions";
import { ClientClerkProvider } from "../client/ClerkProvider";
import { getKeylessStatus, KeylessProvider } from "./keyless-provider";
import { buildRequestLike, getScriptNonceFromHeader } from "./utils";
const getDynamicClerkState = React.cache(async function getDynamicClerkState2() {
  const request = await buildRequestLike();
  const data = getDynamicAuthData(request);
  return data;
});
const getNonceHeaders = React.cache(async function getNonceHeaders2() {
  const headersList = await headers();
  const nonce = headersList.get("X-Nonce");
  return nonce ? nonce : (
    // Fallback to extracting from CSP header
    getScriptNonceFromHeader(headersList.get("Content-Security-Policy") || "") || ""
  );
});
async function ClerkProvider(props) {
  const { children, dynamic, ...rest } = props;
  async function generateStatePromise() {
    if (!dynamic) {
      return Promise.resolve(null);
    }
    if (isNext13) {
      return Promise.resolve(await getDynamicClerkState());
    }
    return getDynamicClerkState();
  }
  async function generateNonce() {
    if (!dynamic) {
      return Promise.resolve("");
    }
    if (isNext13) {
      return Promise.resolve(await getNonceHeaders());
    }
    return getNonceHeaders();
  }
  const propsWithEnvs = mergeNextClerkPropsWithEnv({
    ...rest
  });
  const { shouldRunAsKeyless, runningWithClaimedKeys } = await getKeylessStatus(propsWithEnvs);
  let output;
  try {
    const detectKeylessEnvDrift = await import("../../server/keyless-telemetry.js").then(
      (mod) => mod.detectKeylessEnvDrift
    );
    await detectKeylessEnvDrift();
  } catch {
  }
  if (shouldRunAsKeyless) {
    output = /* @__PURE__ */ React.createElement(
      KeylessProvider,
      {
        rest: propsWithEnvs,
        generateNonce,
        generateStatePromise,
        runningWithClaimedKeys
      },
      children
    );
  } else {
    output = /* @__PURE__ */ React.createElement(
      ClientClerkProvider,
      {
        ...propsWithEnvs,
        nonce: await generateNonce(),
        initialState: await generateStatePromise()
      },
      children
    );
  }
  if (dynamic) {
    return (
      // TODO: fix types so AuthObject is compatible with InitialState
      /* @__PURE__ */ React.createElement(PromisifiedAuthProvider, { authPromise: generateStatePromise() }, output)
    );
  }
  return output;
}
export {
  ClerkProvider
};
//# sourceMappingURL=ClerkProvider.js.map