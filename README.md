# Blogs app

## Folder structure:

- Entry file: `index.ts`
- Project files: `/app`
- Helpers: `/app/helper`
- Middleware: `/app/middleware`,
- Routes: `/app/routes`
- Entities: `/app/scheme`
- Services: `/app/services`

## Scripts:

- To run app in development mode: `npm run start`
- To run app in production mode: `npm run start:prod`
- Lint code: `npm run lint`
- To fix lint issue: `npm run lint:fix`
- To format code: `npm run format`

## Notes:

- Date seeder: This will auto create test data for blogs, lawsuits and categories for new db
- Created search api with optional pagination
- Server side validation
- Formatting and linting: prettier and eslint is configured with lint staged
