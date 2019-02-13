# Edamam Node API

```bash
npm install edamam-node
```

## Usage

```js
const { EdamamClient } = require("edamam-node");

const client = new EdamamClient({
  appId: "your-app-id",
  appKey: "your-app-key"
});
const search = await client.searchRecipesByQuery("your-query");
```

## Documentation

See https://developer.edamam.com for more details.
