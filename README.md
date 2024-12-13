## Run in a local enviorment

first, install the dependencies:

```bash
npm install
# or
bun install
```

then, run the development server:

```bash
npm run dev
# or
bun dev
```

or, using docker:

```bash
docker build -t <image-name> .
docker run -d -p 3000:3000 <image-name>
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.