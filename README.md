# Davis Wang Personal Website

Static site for GitHub Pages hosting.

## Publish To GitHub Pages

1. Create a new GitHub repository.
2. In this folder, add the GitHub remote:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
```

3. Commit the current site files:

```bash
git add .
git commit -m "Prepare personal website for GitHub Pages"
```

4. Push `main` to GitHub:

```bash
git push -u origin main
```

5. In GitHub, open `Settings` > `Pages`.
6. Under `Build and deployment`, set:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/ (root)`
7. Save. GitHub will publish the site at:

```text
https://<your-username>.github.io/<repo-name>/
```

## Custom Domain

If you want to use `daviswang.com` instead of the default GitHub Pages URL:

1. In `Settings` > `Pages`, add your custom domain.
2. Update DNS with your domain provider:
   - `A` records for the apex domain to GitHub Pages IPs
   - `CNAME` for `www` to `<your-username>.github.io`
3. If needed, add a `CNAME` file to this repo with your domain name.

## Notes

- This site is plain HTML, CSS, and JavaScript, so it can deploy directly from the repo root.
- `.nojekyll` is included so GitHub Pages serves the site as-is without Jekyll processing.
