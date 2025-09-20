/**
 * Valid CSP directives according to the CSP Level 3 specification
 */
export type ContentSecurityPolicyDirective = 'connect-src' | 'default-src' | 'font-src' | 'img-src' | 'media-src' | 'object-src' | 'script-src' | 'style-src' | 'base-uri' | 'child-src' | 'form-action' | 'frame-ancestors' | 'frame-src' | 'manifest-src' | 'navigate-to' | 'prefetch-src' | 'worker-src' | 'plugin-types' | 'require-sri-for' | 'sandbox' | 'block-all-mixed-content' | 'require-trusted-types-for' | 'trusted-types' | 'upgrade-insecure-requests' | 'report-to' | 'report-uri' | 'script-src-attr' | 'script-src-elem' | 'style-src-attr' | 'style-src-elem';
export interface ContentSecurityPolicyHeaders {
    /**
     * Array of formatted headers to be added to the response.
     *
     * Includes both standard and report-only headers when applicable.
     * Includes nonce when strict mode is enabled.
     */
    headers: [string, string][];
}
export interface ContentSecurityPolicyOptions {
    /**
     * When set to true, enhances security by applying the `strict-dynamic` attribute to the `script-src` CSP directive
     */
    strict?: boolean;
    /**
     * Custom CSP directives to merge with Clerk's default directives
     */
    directives?: Partial<Record<ContentSecurityPolicyDirective, string[]>>;
    /**
     * When set to true, the Content-Security-Policy-Report-Only header will be used instead of
     * Content-Security-Policy. This allows monitoring policy violations without blocking content.
     */
    reportOnly?: boolean;
    /**
     * Specifies a reporting endpoint for CSP violations. This value will be used in the
     * 'report-to' directive of the Content-Security-Policy header.
     */
    reportTo?: string;
}
/**
 * Generates a secure random nonce for CSP headers
 * @returns A base64-encoded random nonce
 */
export declare function generateNonce(): string;
/**
 * Creates Content Security Policy (CSP) headers with the specified configuration
 * @returns Object containing the formatted CSP headers
 */
export declare function createContentSecurityPolicyHeaders(host: string, options: ContentSecurityPolicyOptions): ContentSecurityPolicyHeaders;
//# sourceMappingURL=content-security-policy.d.ts.map