# OpenAI Model Update

## Changes Made

The OpenAI model used in the jams-playlist-generator project has been updated from the deprecated `gpt-3.5-turbo` to the supported version `gpt-3.5-turbo-0125`.

### Files Modified:

1. `/packages/server/src/controllers/generatePlaylistController.ts`
   - Updated the model from `gpt-3.5-turbo` to `gpt-3.5-turbo-0125`

### New Files Added:

1. `/packages/server/src/tests/generatePlaylistController.test.ts`
   - Added a test to verify that the correct model is being used
2. `/packages/server/vitest.config.ts`
   - Added configuration for the Vitest testing framework

### Package Dependencies Added:

1. Added `vitest` as a development dependency in `/packages/server/package.json`
2. Added test scripts to run the tests

## Why This Change Was Needed

OpenAI periodically deprecates older model versions to ensure users are using the most up-to-date and improved models. The `gpt-3.5-turbo` model without a specific version was deprecated, and using it could lead to errors or degraded performance.

The updated model `gpt-3.5-turbo-0125` is a stable version that provides the same functionality with improvements and bug fixes.

## Future Considerations

OpenAI will continue to release new model versions. To avoid future deprecation issues, consider one of these approaches:

1. **Use the latest stable version explicitly**: Update the model version periodically as new versions are released.
2. **Use model aliases**: OpenAI provides aliases like `gpt-3.5-turbo` that automatically point to the latest stable version, but it's recommended to specify a version for production applications.
3. **Make the model configurable**: Consider moving the model name to an environment variable so it can be updated without code changes.

## Testing

To run the tests to verify the model update:

```bash
cd packages/server
npm test
```

This will run the test that verifies the correct model is being used in the API calls to OpenAI.