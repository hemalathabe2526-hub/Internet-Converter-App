# Backend API Integration Guide

## Overview

This document outlines the API endpoints and data structures required to support the Internet Converter mobile app.

## Base URL

```
https://your-api-domain.com/api
```

## Authentication Endpoints

### 1. Request OTP

**Endpoint**: `POST /auth/request-otp`

**Request**:
```json
{
  "phoneNumber": "9876543210"
}
```

**Response** (Success - 200):
```json
{
  "success": true,
  "data": {
    "phoneNumber": "9876543210",
    "sessionId": "session_abc123",
    "expiresIn": 600
  },
  "message": "OTP sent successfully"
}
```

**Response** (Error - 400):
```json
{
  "success": false,
  "error": "Invalid phone number format"
}
```

### 2. Verify OTP

**Endpoint**: `POST /auth/verify-otp`

**Request**:
```json
{
  "phoneNumber": "9876543210",
  "otp": "123456"
}
```

**Response** (Success - 200):
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_123",
      "phoneNumber": "9876543210",
      "isVerified": true,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    "expiresIn": 86400
  }
}
```

### 3. Logout

**Endpoint**: `POST /auth/logout`

**Headers**: `Authorization: Bearer {token}`

**Response** (Success - 200):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## User Endpoints

### 1. Get User Profile

**Endpoint**: `GET /user/profile`

**Headers**: `Authorization: Bearer {token}`

**Response** (Success - 200):
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "phoneNumber": "9876543210",
    "isVerified": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### 2. Get User Dashboard

**Endpoint**: `GET /user/dashboard`

**Headers**: `Authorization: Bearer {token}`

**Response** (Success - 200):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "phoneNumber": "9876543210",
      "isVerified": true,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    "currentPack": {
      "id": "pack_123",
      "userId": "user_123",
      "packName": "Unlimited 5G - 100GB",
      "totalDataMB": 102400,
      "usedDataMB": 25600,
      "remainingDataMB": 76800,
      "validityStartDate": "2024-01-01T00:00:00Z",
      "validityEndDate": "2024-02-01T00:00:00Z",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    "todayUsage": {
      "id": "usage_123",
      "userId": "user_123",
      "date": "2024-01-15",
      "usedDataMB": 512,
      "remainingDataMB": 1024,
      "convertedToAddOnMB": 0,
      "createdAt": "2024-01-15T00:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    "addOnData": [
      {
        "id": "addon_123",
        "userId": "user_123",
        "addOnDataMB": 1024,
        "createdDate": "2024-01-14T00:00:00Z",
        "expiryDate": "2024-01-21T00:00:00Z",
        "isUsed": false,
        "usedDataMB": 256,
        "createdAt": "2024-01-14T00:00:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "conversionHistory": [
      {
        "id": "conv_123",
        "userId": "user_123",
        "conversionDate": "2024-01-15T00:00:00Z",
        "unusedDataMB": 512,
        "convertedDataMB": 512,
        "createdAt": "2024-01-15T00:00:00Z",
        "updatedAt": "2024-01-15T00:00:00Z"
      }
    ]
  }
}
```

## Data Pack Endpoints

### 1. Get Data Packs

**Endpoint**: `GET /data-packs`

**Headers**: `Authorization: Bearer {token}`

**Response** (Success - 200):
```json
{
  "success": true,
  "data": [
    {
      "id": "pack_123",
      "userId": "user_123",
      "packName": "Unlimited 5G - 100GB",
      "totalDataMB": 102400,
      "usedDataMB": 25600,
      "remainingDataMB": 76800,
      "validityStartDate": "2024-01-01T00:00:00Z",
      "validityEndDate": "2024-02-01T00:00:00Z",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### 2. Update Data Usage

**Endpoint**: `POST /data-usage/update`

**Headers**: `Authorization: Bearer {token}`

**Request**:
```json
{
  "usedDataMB": 512
}
```

**Response** (Success - 200):
```json
{
  "success": true,
  "data": {
    "id": "usage_123",
    "userId": "user_123",
    "date": "2024-01-15",
    "usedDataMB": 512,
    "remainingDataMB": 1024,
    "convertedToAddOnMB": 0,
    "createdAt": "2024-01-15T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

## Add-on Data Endpoints

### 1. Get Add-on Data

**Endpoint**: `GET /add-on-data`

**Headers**: `Authorization: Bearer {token}`

**Response** (Success - 200):
```json
{
  "success": true,
  "data": [
    {
      "id": "addon_123",
      "userId": "user_123",
      "addOnDataMB": 1024,
      "createdDate": "2024-01-14T00:00:00Z",
      "expiryDate": "2024-01-21T00:00:00Z",
      "isUsed": false,
      "usedDataMB": 256,
      "createdAt": "2024-01-14T00:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## Conversion Endpoints

### 1. Convert Unused Data

**Endpoint**: `POST /conversion/convert-unused-data`

**Headers**: `Authorization: Bearer {token}`

**Request**: (Empty body)

**Response** (Success - 200):
```json
{
  "success": true,
  "data": {
    "id": "conv_123",
    "userId": "user_123",
    "conversionDate": "2024-01-15T00:00:00Z",
    "unusedDataMB": 512,
    "convertedDataMB": 512,
    "createdAt": "2024-01-15T00:00:00Z",
    "updatedAt": "2024-01-15T00:00:00Z"
  },
  "message": "Data converted successfully"
}
```

### 2. Get Conversion History

**Endpoint**: `GET /conversion/history`

**Headers**: `Authorization: Bearer {token}`

**Query Parameters**:
- `limit`: Number of records (default: 50)
- `offset`: Pagination offset (default: 0)

**Response** (Success - 200):
```json
{
  "success": true,
  "data": [
    {
      "id": "conv_123",
      "userId": "user_123",
      "conversionDate": "2024-01-15T00:00:00Z",
      "unusedDataMB": 512,
      "convertedDataMB": 512,
      "createdAt": "2024-01-15T00:00:00Z",
      "updatedAt": "2024-01-15T00:00:00Z"
    },
    {
      "id": "conv_122",
      "userId": "user_123",
      "conversionDate": "2024-01-14T00:00:00Z",
      "unusedDataMB": 256,
      "convertedDataMB": 256,
      "createdAt": "2024-01-14T00:00:00Z",
      "updatedAt": "2024-01-14T00:00:00Z"
    }
  ]
}
```

## Error Handling

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| INVALID_PHONE | 400 | Invalid phone number format |
| INVALID_OTP | 400 | OTP is incorrect or expired |
| UNAUTHORIZED | 401 | Missing or invalid authentication token |
| FORBIDDEN | 403 | User doesn't have permission |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Resource already exists |
| RATE_LIMIT | 429 | Too many requests |
| SERVER_ERROR | 500 | Internal server error |

## Authentication

All protected endpoints require the `Authorization` header:

```
Authorization: Bearer {token}
```

Tokens are JWT tokens with the following claims:
- `sub`: User ID
- `phone`: Phone number
- `iat`: Issued at timestamp
- `exp`: Expiration timestamp (24 hours)

## Rate Limiting

- **OTP Requests**: 5 per phone number per hour
- **API Requests**: 100 per user per minute
- **Conversion**: 1 per user per day (automatic at midnight)

## Data Validation

### Phone Number
- Format: 10-digit Indian phone number
- Example: `9876543210`

### OTP
- Format: 6-digit numeric code
- Validity: 10 minutes from generation

### Data Values
- All data sizes in MB (Megabytes)
- Minimum: 0 MB
- Maximum: 1,048,576 MB (1 TB)

## Scheduled Tasks

### Midnight Conversion

The backend should automatically trigger data conversion for all users at midnight (00:00 UTC):

```
POST /conversion/convert-unused-data
Authorization: Bearer {system_token}
Body: { "userId": "user_123", "automatic": true }
```

This should:
1. Calculate unused data from the previous day
2. Create add-on data entry
3. Log conversion in history
4. Update user's data pack

## Database Schema Requirements

### users
```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  phoneNumber VARCHAR(20) UNIQUE NOT NULL,
  isVerified BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### dataPacks
```sql
CREATE TABLE dataPacks (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NOT NULL,
  packName VARCHAR(255) NOT NULL,
  totalDataMB DECIMAL(10, 2) NOT NULL,
  usedDataMB DECIMAL(10, 2) DEFAULT 0,
  remainingDataMB DECIMAL(10, 2) NOT NULL,
  validityStartDate TIMESTAMP NOT NULL,
  validityEndDate TIMESTAMP NOT NULL,
  isActive BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

### addOnData
```sql
CREATE TABLE addOnData (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NOT NULL,
  addOnDataMB DECIMAL(10, 2) NOT NULL,
  createdDate DATE NOT NULL,
  expiryDate DATE NOT NULL,
  isUsed BOOLEAN DEFAULT FALSE,
  usedDataMB DECIMAL(10, 2) DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

### conversionHistory
```sql
CREATE TABLE conversionHistory (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NOT NULL,
  conversionDate TIMESTAMP NOT NULL,
  unusedDataMB DECIMAL(10, 2) NOT NULL,
  convertedDataMB DECIMAL(10, 2) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

## Security Requirements

1. **HTTPS Only**: All API endpoints must use HTTPS
2. **JWT Tokens**: Use HS256 or RS256 algorithm
3. **Rate Limiting**: Implement rate limiting per user/IP
4. **Input Validation**: Validate all inputs on backend
5. **SQL Injection Prevention**: Use parameterized queries
6. **CORS**: Configure appropriate CORS headers
7. **Logging**: Log all API requests for audit trail

## Testing the API

### Using cURL

```bash
# Request OTP
curl -X POST https://your-api-domain.com/api/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"9876543210"}'

# Verify OTP
curl -X POST https://your-api-domain.com/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"9876543210","otp":"123456"}'

# Get Dashboard
curl -X GET https://your-api-domain.com/api/user/dashboard \
  -H "Authorization: Bearer {token}"
```

## Support

For API integration support, contact the backend development team.

---

**API Version**: 1.0.0  
**Last Updated**: June 2026
