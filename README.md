# sentence-classification
Via universal sentence encoder and k-means

## Running the Application Locally (Without Docker)
Before running the application, it's recommended to rebuild the tensorflow-node for your environment.
```shell
## make sure you have the necessary packages installed.
## If you're unsure about which packages are required, refer to the Dockerfile for guidance.  
npm run rebuild:tsjs
```

Once the rebuild is complete
```shell
npm install
npm run start
```

## Building the Docker Image
To build the Docker image for the application, make sure to set the `HTTP_PORT` build argument to match the port in your .env file.
```shell
docker build --build-arg HTTP_PORT=4544 --tag hermeslin/sentence-classification:latest .
```

## Running the Docker Container with the .env File
To run the Docker container with your .env file for environment variable configuration, execute the following:
```shell
docker run -p 4544:4544 --env-file .env hermeslin/sentence-classification:latest
```

## Overriding the Entry Point (Optional)
If you need to access the container's shell directly (for debugging or other purposes), you can override the entry point and open a Bash shell with:
```shell
docker run -it --entrypoint /bin/bash -p 4544:4544 --env-file .env hermeslin/sentence-classification:latest
```

## Building and Pushing the Docker Image to GCP via GitHub Actions
To be continued...
