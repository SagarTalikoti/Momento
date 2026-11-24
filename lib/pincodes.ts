/**
 * Comprehensive Indian Postal Index Number (PIN Code) validation
 * Covers all official postal circles across India (Zones 1 through 9)
 */

// Valid 2-digit postal circle prefixes across India
const VALID_INDIAN_POSTAL_PREFIXES = new Set([
  // Zone 1: Delhi, Haryana, Punjab, Himachal Pradesh, J&K, Ladakh, Chandigarh
  11, 12, 13, 14, 15, 16, 17, 18, 19,

  // Zone 2: Uttar Pradesh, Uttarakhand
  20, 21, 22, 23, 24, 25, 26, 27, 28,

  // Zone 3: Rajasthan, Gujarat, Daman, Diu, Dadra & Nagar Haveli
  30, 31, 32, 33, 34, 36, 37, 38, 39,

  // Zone 4: Maharashtra, Goa, Madhya Pradesh, Chhattisgarh
  40, 41, 42, 43, 44, 45, 46, 47, 48, 49,

  // Zone 5: Telangana, Andhra Pradesh, Karnataka
  50, 51, 52, 53, 56, 57, 58, 59,

  // Zone 6: Tamil Nadu, Puducherry, Kerala, Lakshadweep
  60, 61, 62, 63, 64, 67, 68, 69,

  // Zone 7: West Bengal, Odisha, Assam, Arunachal, Manipur, Meghalaya, Mizoram, Nagaland, Tripura, Andaman & Nicobar, Sikkim
  70, 71, 72, 73, 74, 75, 76, 77, 78, 79,

  // Zone 8: Bihar, Jharkhand
  80, 81, 82, 83, 84, 85,

  // Zone 9: Army Postal Service (APS) & Field Post Offices (FPO)
  90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
]);

export interface PincodeValidationResult {
  isValid: boolean;
  message: string;
}

/**
 * Validates any Indian PIN code
 * @param pincode 6-digit postal code
 */
export function validateIndianPincode(pincode: string): PincodeValidationResult {
  const cleaned = (pincode || "").trim();

  if (!cleaned) {
    return {
      isValid: false,
      message: "Please enter a 6-digit PIN code",
    };
  }

  // Must contain only digits
  if (!/^\d+$/.test(cleaned)) {
    return {
      isValid: false,
      message: "PIN code must contain numbers only",
    };
  }

  if (cleaned.length < 6) {
    return {
      isValid: false,
      message: `Enter ${6 - cleaned.length} more digit${6 - cleaned.length > 1 ? "s" : ""}`,
    };
  }

  if (cleaned.length > 6) {
    return {
      isValid: false,
      message: "PIN code must be exactly 6 digits",
    };
  }

  // Indian PIN codes cannot start with 0
  if (cleaned.startsWith("0")) {
    return {
      isValid: false,
      message: "Invalid PIN code (cannot start with 0)",
    };
  }

  const prefix = parseInt(cleaned.substring(0, 2), 10);
  if (!VALID_INDIAN_POSTAL_PREFIXES.has(prefix)) {
    return {
      isValid: false,
      message: "Invalid postal circle PIN code",
    };
  }

  // Last 4 digits shouldn't be 0000
  if (cleaned.substring(2) === "0000") {
    return {
      isValid: false,
      message: "Invalid delivery post office code",
    };
  }

  return {
    isValid: true,
    message: "Service & Setup Available!",
  };
}
