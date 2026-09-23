# Ritter Sport photo API

The 77 photos in `ritterSportMemes/` have IDs `0` through `76` (from their JPEG filenames).
The site root (`/`) has a short page with links to both endpoints.

| Endpoint | Result |
| --- | --- |
| `GET /api/photos/:id` | The JPEG for that ID. For example, `/api/photos/0`. |
| `GET /api/random` | One randomly selected JPEG from the available files. |

Both successful responses have `Content-Type: image/jpeg` and an `X-Photo-Id` header containing the selected ID. An unknown ID returns HTTP 404 with `{"error":"Photo not found"}`. If there are no photos, either endpoint returns HTTP 404 with `{"error":"No photos available"}`. Other HTTP methods return 405.

## Deploy on Vercel

Import this GitHub repository as a Vercel project, keep the project root at the repository root, and use the **Other** framework preset. No build command, environment variables, or dependencies are needed. The `vercel.json` file includes the JPEGs in both function bundles. After deployment, use `https://<your-project-domain>/api/photos/0` or `https://<your-project-domain>/api/random`.

To run the endpoint checks locally with Node.js, use `node --test`.
