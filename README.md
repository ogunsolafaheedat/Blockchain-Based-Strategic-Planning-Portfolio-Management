# Blockchain-Based Strategic Planning Portfolio Management

A comprehensive smart contract system built on Stacks blockchain using Clarity for managing strategic portfolio planning, resource allocation, and value optimization.

## Overview

This system provides a decentralized approach to portfolio management with the following key components:

- **Portfolio Manager Verification**: Validates and manages strategic portfolio managers
- **Project Prioritization**: Prioritizes strategic projects based on multiple criteria
- **Resource Allocation**: Manages and allocates portfolio resources efficiently
- **Risk Assessment**: Comprehensive risk evaluation and mitigation planning
- **Value Optimization**: Optimizes portfolio value through strategic decisions

## Smart Contracts

### 1. Portfolio Manager Verification (`portfolio-manager-verification.clar`)
- Verifies portfolio managers with certification levels
- Manages manager credentials and active status
- Provides authorization controls for sensitive operations

### 2. Project Prioritization (`project-prioritization.clar`)
- Creates and manages strategic projects
- Calculates priority scores based on strategic value, risk, and resource requirements
- Tracks project status and lifecycle

### 3. Resource Allocation (`resource-allocation.clar`)
- Manages financial, human, and technology resource pools
- Allocates resources to projects based on availability
- Tracks resource utilization and enables reallocation

### 4. Risk Assessment (`risk-assessment.clar`)
- Comprehensive risk evaluation across multiple dimensions
- Calculates overall risk scores and risk levels
- Manages mitigation plans and risk monitoring

### 5. Value Optimization (`value-optimization.clar`)
- Creates optimization strategies for portfolio enhancement
- Calculates value scores based on ROI, cost, and timeline
- Tracks portfolio metrics and performance indicators

## Key Features

- **Decentralized Governance**: Smart contract-based decision making
- **Transparent Operations**: All transactions recorded on blockchain
- **Automated Calculations**: Built-in scoring and optimization algorithms
- **Resource Management**: Efficient allocation and tracking of resources
- **Risk Management**: Comprehensive risk assessment and mitigation
- **Value Optimization**: Data-driven portfolio optimization strategies

## Getting Started

### Prerequisites
- Stacks blockchain development environment
- Clarity CLI tools
- Node.js and npm for testing

### Installation

1. Clone the repository
   \`\`\`bash
   git clone <repository-url>
   cd blockchain-portfolio-management
   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   \`\`\`

3. Run tests
   \`\`\`bash
   npm test
   \`\`\`

### Deployment

Deploy contracts to Stacks blockchain:

\`\`\`bash
# Deploy to testnet
clarinet deploy --testnet

# Deploy to mainnet
clarinet deploy --mainnet
\`\`\`

## Usage Examples

### Verify a Portfolio Manager
\`\`\`clarity
(contract-call? .portfolio-manager-verification verify-manager
'SP1234567890ABCDEF
"John Doe"
u5)
\`\`\`

### Create a Strategic Project
\`\`\`clarity
(contract-call? .project-prioritization create-project
"Digital Transformation Initiative"
"Modernize legacy systems and processes"
u85  ;; strategic score
u30  ;; risk score
u500000) ;; resource requirement
\`\`\`

### Allocate Resources
\`\`\`clarity
(contract-call? .resource-allocation allocate-resources
u1      ;; project-id
u100000 ;; financial
u10     ;; human resources
u5)     ;; technology resources
\`\`\`

## Testing

The project includes comprehensive tests using Vitest:

\`\`\`bash
npm test
\`\`\`

Tests cover:
- Contract deployment and initialization
- Manager verification workflows
- Project creation and prioritization
- Resource allocation and deallocation
- Risk assessment calculations
- Value optimization strategies

## Architecture

The system follows a modular architecture with clear separation of concerns:

- Each contract handles a specific domain of portfolio management
- Contracts can interact with each other for comprehensive workflows
- Data structures are optimized for efficient storage and retrieval
- Error handling provides clear feedback for all operations

## Security Considerations

- Authorization checks prevent unauthorized access
- Input validation ensures data integrity
- Resource limits prevent abuse
- Immutable audit trail for all operations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions and support, please open an issue in the GitHub repository.
