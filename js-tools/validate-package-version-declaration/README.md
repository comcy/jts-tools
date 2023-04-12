# validate-package-version.js

This script can be used to scan package in any `package.json` file of a **node** related project.

You need to provide a configuration file. The file contains the following information:

- `packages`: a list of any package you want to check

Any package declaration consists of the following additional declarations:

- `name`: Name of the package to test.
- `allowedVersion`: A severity-flag for rating the version information of the declared package.

  > At the moment only "stable" is supported

Sample

```json
{
  "packages": [
    {
      "name": "package-to-test",
      "allowedVersion": "stable"
    }
  ]
}
```
