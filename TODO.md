# Backend Development Plan for Construction Company Website

## Information Gathered
- Existing codebase has basic structure with models, controllers, routes, but they don't match the specification.
- Models need updates: Admin (ok), Home (missing), About (wrong fields), Services (wrong fields), Projects (wrong fields), Contact (wrong fields), Enquiries (missing).
- Multer not installed, need for image uploads.
- JWT authentication partially implemented.
- Need to implement public and protected APIs as per spec.

## Plan
1. Update package.json to include multer dependency.
2. Create/update models to match spec:
   - Home.js: heroTitle, heroDescription, bannerImages (array), experience, projectCount, phoneNumber.
   - About.js: introduction, journey, experience, totalProjects, mission, vision.
   - Service.js: title, description, image, isActive.
   - Project.js: title, description, category (enum), coverImage, images (array), status (enum).
   - Contact.js: address, phone, email, socialLinks (object).
   - Enquiry.js: name, phone, message, createdAt.
3. Implement upload utils for Multer (single and multiple images).
4. Update controllers for CRUD operations on each model.
5. Update routes for public and admin APIs.
6. Implement enquiry submission and retrieval.
7. Ensure JWT middleware protects admin routes.

## Dependent Files to Edit
- package.json
- src/models/Home.js (create)
- src/models/About.js
- src/models/Service.js
- src/models/Project.js
- src/models/Contact.js
- src/models/Enquiry.js (create)
- src/utils/upload.js
- src/controllers/home.controller.js
- src/controllers/about.controller.js
- src/controllers/service.controller.js
- src/controllers/project.controller.js
- src/controllers/contact.controller.js
- src/controllers/enquiry.controller.js (create)
- src/routes/public/home.routes.js
- src/routes/public/about.routes.js
- src/routes/public/services.routes.js
- src/routes/public/projects.routes.js
- src/routes/public/contact.routes.js
- src/routes/public/enquiry.routes.js (create)
- src/routes/admin/home.routes.js
- src/routes/admin/about.routes.js
- src/routes/admin/services.routes.js
- src/routes/admin/projects.routes.js
- src/routes/admin/contact.routes.js
- src/routes/admin/enquiries.routes.js (create)

## Followup Steps
- Install dependencies: npm install
- Set up environment variables (.env) for MongoDB URI, JWT_SECRET
- Test public APIs (GET /api/home, etc.)
- Test admin login and protected APIs
- Implement image serving statically
- Add validation and error handling
