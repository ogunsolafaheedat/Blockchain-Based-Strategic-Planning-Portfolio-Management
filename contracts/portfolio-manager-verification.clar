;; Portfolio Manager Verification Contract
;; Validates and manages strategic portfolio managers

(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_UNAUTHORIZED (err u100))
(define-constant ERR_ALREADY_VERIFIED (err u101))
(define-constant ERR_NOT_VERIFIED (err u102))
(define-constant ERR_INVALID_MANAGER (err u103))

;; Data structures
(define-map verified-managers principal bool)
(define-map manager-details principal {
    name: (string-ascii 50),
    certification-level: uint,
    verification-date: uint,
    active: bool
})

;; Read-only functions
(define-read-only (is-verified-manager (manager principal))
    (default-to false (map-get? verified-managers manager))
)

(define-read-only (get-manager-details (manager principal))
    (map-get? manager-details manager)
)

;; Public functions
(define-public (verify-manager (manager principal) (name (string-ascii 50)) (cert-level uint))
    (begin
        (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_UNAUTHORIZED)
        (asserts! (not (is-verified-manager manager)) ERR_ALREADY_VERIFIED)
        (map-set verified-managers manager true)
        (map-set manager-details manager {
            name: name,
            certification-level: cert-level,
            verification-date: block-height,
            active: true
        })
        (ok true)
    )
)

(define-public (revoke-manager (manager principal))
    (begin
        (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_UNAUTHORIZED)
        (asserts! (is-verified-manager manager) ERR_NOT_VERIFIED)
        (map-set verified-managers manager false)
        (map-set manager-details manager
            (merge (unwrap-panic (get-manager-details manager)) { active: false })
        )
        (ok true)
    )
)
