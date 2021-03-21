### Build Docker image

```bash
    $ docker build -t lens-api .
```

### Run instance of image in container

-d = detatched mode
-p = publish, [local port]:[docker port]

```bash
    $ docker run -d -p 4000:4000 lens-api:latest
```
