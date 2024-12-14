# INSTALLATION FROM THE START OF BACKEND

# CREATE FOLDER STRUCTURE

```
    mkdir backend
    npm init -y
    touch .env


    npm install express typescript ts-node-dev @types/express

    npx tsc --init // create tsconfig.json

```

# Create a typescript node

```
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true,
    "rootDir": "./src",
    "sourceMap": true
  }
}

```

# INITIALIZE THE FOLDER STRUCTURE

```
    Create src folder and create below folder structure
        - controllers
        - interface
        - models
        - services
        - utils
        index.ts
        routes.ts
```

# SETUP INDEX.TS INSIDE SRC

```
    import express from 'express';

    const app = express();
    const port = 3000;

    app.get('/', (req, res) => {
    res.send('Hello World from Express + TypeScript!');
    });

    app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    });

```


