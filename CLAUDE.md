# Flow Project Guidelines

## Build & Development Commands
- Start development server: `npm run start` or `npm run start-dev`
- Build for production: `npm run build`
- Preview production build: `npm run serve`
- Format code: `npm run format`

## Code Style Guidelines
- Uses Prettier with the following configuration:
  - Semi-colons required
  - Double quotes for strings
  - Tab width of 4 spaces
  - ES5 trailing commas

## Project Structure
- React application using Redux and Zustand for state management
- Component-based architecture with JSX
- Uses @xyflow/react for flow visualization
- Slices pattern for Redux state management

## Naming Conventions
- React components use PascalCase (e.g., `ArgumentNode`, `TextEntryNode`)
- Redux actions use camelCase (e.g., `addCardAfter`, `setSelectedNode`)
- Files follow component names with .jsx extension
- Reducers and slices should be clearly named with their purpose

## Error Handling
- Use Redux state to track and handle errors
- Maintain clean error states in components