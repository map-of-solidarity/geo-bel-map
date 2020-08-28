# GeoBel

[https://geobel.online](https://geobel.online)

Map of Solidarity

## General information

GeoBel shows real-time locations of protests, medical points, OMON forces and more, on a map of Minsk in Belarus.

The app can be quickly reused to support protesters in similar scenarios in other places.

The app is open and its aim is to increase the safety of protesters.

## Packages

The app consists of independent packages:

- frontend
  - GeoBel Android
  - GeoBel iOS
  - GeoBel RN (React Native)
- frontend-react-app
- telegram-client

## frontend-react-app

The app is essentially a basic PWA built with [CRA](https://github.com/facebook/create-react-app).

Most of the content is served via an `iframe` from [ArcGis](https://www.arcgis.com/)

## Contributing

The first step is to find an interesting Issue from the [current project](https://github.com/map-of-solidarity/geo-bel-map-of-solidarity/projects/1).

Assign the Issue to yourself.

Clone the repo.

Create a new branch with the format `<issue number>-basic_description` e.g. `68-readme`

From the `frontend-react-app` directory, install the app using:

```shell
npm i
```

*You will need environmental variables*. You can copy them from the file `frontend-react-app/.env.sample` into the git-ignored file `frontend-react-app/.env` (which you will need to create).

Next, start the app:

```shell
npm start
```

You can now access the app via [https://localhost:3000](https://localhost:3000)

### Publishing your work

When you are done, commit your work. We use the message format `changes description #<issue_number>`.

Publish to Github (subsitute `<branch_name>` for e.g. `68-readme`)

Create a PR via Github. Await your PR to be reviewed. Once it passes review, it will be merged to `master`.

```shell
git push -u origin <branch_name>
```

Later a team member may deploy that new version to [geobel.online](https://geobel.online)

## Deployment

To be able to deploy, you need to be logged in with firebase and have permissions to deploy in the firebase project.

The following steps will ensure a proper deployment:

```shell
npm i
npm run build
npm run deploy
```

## Awards

The project is a winner of the [Build for Belarus](https://eventornado.com/event/build-for-belarus) hackathon

## Where to find us

We can be contacted on the #geo-bel channel on [belarushack Slack](belarushack.slack.com)

You can also write to us on our [Support Telegram Channel](https://t.me/joinchat/CVMoxBKG8TGpZZy74Ren3g)
