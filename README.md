# Salsify Product Finder

## Project Overview

This application is a dynamic product filtering interface designed to filter products based on their properties. The core challenge was to create a condition editor that allows users to filter a set of products by selecting properties, operators, and values.

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Headless UI
- Vite

## Development Process

### Time Spent

- Estimated development time: 4-5 hours

## Technical Architecture

### Components

1. **ProductFinder**:

   - Main container component
   - Manages overall state of filtering
   - Renders FilterGroup and Table components

2. **FilterGroup**:

   - Handles filter condition creation
   - Provides dropdowns for:
     - Property selection
     - Operator selection
     - Value input
   - Manages filter state and propagates changes to parent component

3. **DropdownMenu**:

   - Reusable dropdown component
   - Supports selection of properties and operators
   - Uses Headless UI for accessibility and styling

4. **ValueDropdown**:
   - Handles value input for different property types
   - Supports enumerated and text/number inputs

### Data Flow

1. User selects a property
2. Available operators are filtered based on property type
3. User selects an operator
4. Value input is dynamically rendered depending on operator (if required)
5. Filter is applied to the product list in real-time

## Running the project

### Prerequisites

- Node.js (v20)
- npm (v10)

### Installation

1. Clone the repository
2. Run `npm install`
3. Start the development server with `npm run dev`

## Potential Enhancements

- Persisting filters in the URL, which would allow users to:
  - Copy and share specific filter states
  - Navigate between different filter configurations
  - Maintain filter state after page refreshes
- Add filter combination logic (AND/OR)
- Implement more advanced filtering operators
- Create comprehensive test suite
