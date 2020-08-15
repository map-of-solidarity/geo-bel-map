# Telegram client

---

## Commands

`yarn start` - start bot
`yarn watch` - watching for changes & rebuild
`yarn build` - build

## Deploy

Setup env

1. Need to create new app on [Telegram website](https://my.telegram.org/apps)

```
APP_ID=
APP_HASH=
```

2. Build TDLib library according the [instruction](https://github.com/tdlib/td#building)

```
Provide path to the tdjson (windows) / libtdjson (unix) command.
TDLIB_COMMAND=
```

3. Install [node-gyp](https://github.com/nodejs/node-gyp#installation)
4. Install packages

```
npm install
```

### Links

[Airgram Docs](https://airgram.io/guides/installation)
