# FolderContainer Components

This directory contains the refactored components for the folder functionality, broken down into smaller, more manageable pieces for better maintainability and readability.

## Components Structure

### Main Component
- **FolderItem.jsx** - Main component that orchestrates all folder-related functionality

### Sub-components
- **FolderButton.jsx** - Handles the main folder button display and click behavior
- **FolderContextMenu.jsx** - Manages the right-click context menu with pin, edit, and delete options
- **DeleteFolderModal.jsx** - Handles the delete confirmation modal with custom checkbox
- **CustomCheckbox.jsx** - Reusable custom checkbox component with Material Design styling

### Utilities
- **useContextMenu.js** - Custom hook for context menu logic (currently unused but available for future use)

## Benefits of Refactoring

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components like CustomCheckbox can be reused elsewhere
3. **Maintainability**: Easier to locate and modify specific functionality
4. **Readability**: Smaller files are easier to understand and navigate
5. **Testing**: Individual components can be tested in isolation

## File Sizes (Before vs After)

- **Before**: FolderItem.jsx (406 lines)
- **After**:
  - FolderItem.jsx (122 lines)
  - FolderButton.jsx (65 lines)
  - FolderContextMenu.jsx (120 lines)
  - DeleteFolderModal.jsx (85 lines)
  - CustomCheckbox.jsx (85 lines)

Total: 477 lines (slightly more due to proper component structure and reusability)

## Usage

```jsx
import FolderItem from './FolderItem'

// The component API remains the same
<FolderItem
  folder={folderData}
  setReload={setReload}
  isFirst={isFirst}
  isLast={isLast}
  isSingle={isSingle}
/>
```
