import { describe, it, expect, beforeEach } from "vitest"

describe("Portfolio Manager Verification Contract", () => {
	let contractState
	
	beforeEach(() => {
		// Mock contract state
		contractState = {
			verifiedManagers: new Map(),
			managerDetails: new Map(),
			contractOwner: "SP1234567890OWNER",
		}
	})
	
	describe("Manager Verification", () => {
		it("should verify a new manager successfully", () => {
			const manager = "SP1234567890MANAGER"
			const name = "John Doe"
			const certLevel = 5
			const txSender = "SP1234567890OWNER"
			
			// Simulate contract call
			const result = verifyManager(contractState, manager, name, certLevel, txSender)
			
			expect(result.success).toBe(true)
			expect(contractState.verifiedManagers.get(manager)).toBe(true)
			expect(contractState.managerDetails.get(manager)).toEqual({
				name: name,
				certificationLevel: certLevel,
				verificationDate: expect.any(Number),
				active: true,
			})
		})
		
		it("should reject verification from non-owner", () => {
			const manager = "SP1234567890MANAGER"
			const name = "John Doe"
			const certLevel = 5
			const txSender = "SP1234567890NOTOWNER"
			
			const result = verifyManager(contractState, manager, name, certLevel, txSender)
			
			expect(result.success).toBe(false)
			expect(result.error).toBe("ERR_UNAUTHORIZED")
		})
		
		it("should reject duplicate manager verification", () => {
			const manager = "SP1234567890MANAGER"
			const name = "John Doe"
			const certLevel = 5
			const txSender = "SP1234567890OWNER"
			
			// First verification
			contractState.verifiedManagers.set(manager, true)
			
			const result = verifyManager(contractState, manager, name, certLevel, txSender)
			
			expect(result.success).toBe(false)
			expect(result.error).toBe("ERR_ALREADY_VERIFIED")
		})
	})
	
	describe("Manager Status Checks", () => {
		it("should correctly identify verified managers", () => {
			const manager = "SP1234567890MANAGER"
			contractState.verifiedManagers.set(manager, true)
			
			const isVerified = isVerifiedManager(contractState, manager)
			expect(isVerified).toBe(true)
		})
		
		it("should return false for unverified managers", () => {
			const manager = "SP1234567890MANAGER"
			
			const isVerified = isVerifiedManager(contractState, manager)
			expect(isVerified).toBe(false)
		})
	})
	
	describe("Manager Revocation", () => {
		it("should revoke manager successfully", () => {
			const manager = "SP1234567890MANAGER"
			const txSender = "SP1234567890OWNER"
			
			// Setup verified manager
			contractState.verifiedManagers.set(manager, true)
			contractState.managerDetails.set(manager, {
				name: "John Doe",
				certificationLevel: 5,
				verificationDate: 1000,
				active: true,
			})
			
			const result = revokeManager(contractState, manager, txSender)
			
			expect(result.success).toBe(true)
			expect(contractState.verifiedManagers.get(manager)).toBe(false)
			expect(contractState.managerDetails.get(manager).active).toBe(false)
		})
	})
})

// Mock contract functions
function verifyManager(state, manager, name, certLevel, txSender) {
	if (txSender !== state.contractOwner) {
		return { success: false, error: "ERR_UNAUTHORIZED" }
	}
	
	if (state.verifiedManagers.get(manager)) {
		return { success: false, error: "ERR_ALREADY_VERIFIED" }
	}
	
	state.verifiedManagers.set(manager, true)
	state.managerDetails.set(manager, {
		name: name,
		certificationLevel: certLevel,
		verificationDate: Date.now(),
		active: true,
	})
	
	return { success: true }
}

function isVerifiedManager(state, manager) {
	return state.verifiedManagers.get(manager) || false
}

function revokeManager(state, manager, txSender) {
	if (txSender !== state.contractOwner) {
		return { success: false, error: "ERR_UNAUTHORIZED" }
	}
	
	if (!state.verifiedManagers.get(manager)) {
		return { success: false, error: "ERR_NOT_VERIFIED" }
	}
	
	state.verifiedManagers.set(manager, false)
	const details = state.managerDetails.get(manager)
	state.managerDetails.set(manager, { ...details, active: false })
	
	return { success: true }
}
