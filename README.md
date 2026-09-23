# Ritter Sport Meme Photo API

A small, dependency-free API for the 77 JPEGs in [`ritterSportMemes/`](ritterSportMemes/). Each photo's ID is its filename without `.jpeg`; the current IDs are `0` through `76`.

**Live site:** [ritter-sport-api.vercel.app](https://ritter-sport-api.vercel.app/)

## Endpoints

| Request | What it returns |
| --- | --- |
| [`GET /api/photos/0`](https://ritter-sport-api.vercel.app/api/photos/0) | The JPEG with ID `0`. Replace `0` with another photo ID. |
| [`GET /api/random`](https://ritter-sport-api.vercel.app/api/random) | One randomly selected JPEG. |

Both endpoints return the image bytes with `Content-Type: image/jpeg` and an `X-Photo-Id` header. For example, to save a photo:

```sh
curl -L -o photo.jpeg https://ritter-sport-api.vercel.app/api/photos/0
```

Errors are JSON:

| Case | Status | Body |
| --- | --- | --- |
| Unknown photo ID | 404 | `{"error":"Photo not found"}` |
| No photos in the collection | 404 | `{"error":"No photos available"}` |
| Method other than GET | 405 | `{"error":"Method not allowed"}` |

## Run checks locally

Use Node.js (`node --test`) or Bun (`bun test`). The tests cover photo lookup, random selection, invalid IDs, and an empty collection. No packages need to be installed.

## Deployment

The project is deployed from the `master` branch on Vercel. Pushing a commit to that branch triggers a new deployment. For a separate Vercel project, import this repository, set the root directory to `./`, and use the **Other** preset. No build command or environment variables are required. [`vercel.json`](vercel.json) routes `/api/photos/:id` and includes the JPEGs in the functions.

## Photo source

The photos were taken from [this Reddit post](https://www.reddit.com/r/de/comments/6a0c9q/mir_wurde_gesagt_ich_solle_meine_ritter_sport/) and resized to the same dimensions, as recorded in [`source.txt`](source.txt).
