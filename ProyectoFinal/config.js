const config = {
    Mongo:{
        uri: "mongodb://localhost:27017/ecommerce",
        options: {
            serverSelectionTimeoutMS: 5000,
        }
    },
    Firebase: {
        "type": "service_account",
        "project_id": "ecommerce-db500",
        "private_key_id": "3e03876e36fd7248fe15198811344bed824e9ab0",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDf4Xux98PiJLVV\nPo/b1lzWNMlcW1F4BsRQErHATUupij+gc5EiXfNmRR5cnJ7soKW8oTGowtURCpFf\nhgZxMQ4Z4Nfz/NPoEjDGgUByAWHBT8J2AScafO9DNqjtyzVsYXpw4Oj7ukUe/3Ri\nmQnG0lefH2np6dTgYIRtNoxxepgPwf+M6mP8yHyy+7CF66ZNnO9V6vwJvpmYNOML\nzr4xSPP+IPxPfXSuWFfRfkKNtcC94AWM9rFJWJhMGe7DYcGhWLPSh9I9HBTlghj1\nsNHlmdeo2ScuGWaOIU/pR8zYiroSSOakzt45hgCSeqii7MfImWdgaHk95SkQAdOm\nM9pwAGYBAgMBAAECggEAA+YTDafxscxTajSFnEGr/mTXH3olgaVeRYHUVavA7DcA\npXdivvw/bAPaz+iAM+EmrrmoxgJd1BMM0drRXZbx4rNrtlN8KBjKP7g2MGAP2QY9\n1ejOas2je+Zhn+m9rIVobLsdco4JdG0k3G9TZEqDIS26lirC0M0cfEOGk8azi4Vs\nOmMkqQiAHY6GMnd6aCFhbFCspyYDWU7cR91sWumVpeaDnzVOz0MS1UkORAzIDo1S\nMvlDx5TQEmF9rYVFfYkvhQ/b7kFRV2cUzGZMduV+tslrJzwhe/WMRsX/YWPhxnm4\n3kLSZnBN2Xp32Ki5kdctC5YQhwrKeEIA1FEM/Yds4QKBgQDyfGE4O1xwSx+Y8RIj\nxX04NfX8Pg2wjmUV/P/hZdUE5hhFgNPC7MJoFGcjKwyws0Ps9Ei5XbPeqHOS326A\nEs+yxqDM0Bgj9RWc6e9Ek4aMx6SD13J12cEwCR0StWcsVd6p89gT1RM/LZU2epYz\nJdKL75AXuAldLmFyGURyB8Wt4QKBgQDsW6jETzSf7qxgXzGCc4j+2lfbTtqOKb/3\noETZUA+s14XTGPP6kinY3NkW76KcYJNcnXt2iuV3lfeIIDd4wIYPwqS/F+BYb75g\nHBSwapG42q9Xd2vyY0Q1TyjZWv8CnLJjOFy1xH959yF5VcB6+tVLcEKETxc6i8kA\n6BhBIMx8IQKBgAO9nXZTnBpzXjpqxZ/dpQ/f7TqF7oohuDd9nqjofD/GGOvBkAK6\nykj2v5yQRnLXYR3fqtuJMYQmzxmd7sN1BtU4MTTXpPexCTNRfIpvSC0Vy1jpUu+0\ne0F1coheWggaDwRKKbQsnk5kMqAThgul8riL6oojIanZVFGBSEgGDKuhAoGBAI+b\nRVg5M6U0s8E+NWuoXQVTjmvuZjZYQY3n780FqvB+Zo4TLDIDWq+rx6763JccyoxM\nFva4f6GAGcy4nlucxhePUN/WVvYEtuvYQ+3IYk+pdz2yjoDQNWIafZxKgISKxowo\nc5PxFu7463q4UmGmQ7A5PgD7uQZWZkNJwWrYzcVhAoGAFqbVLXrASaghTj5DmFZV\nJj2urKlLmms86FTFb+JW+NSy+SeU5GUNfS82ue/1znJeA0g10L11anZWBFCas8cv\nvGEglys7KCuVg83tqtQiuJb1RK4Q92sXFGpt9q2Skl9aLzF9NhMp6jY46BkZhz2h\np2+CnqADUaZqnh+FbpBm/Ns=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-9y40r@ecommerce-db500.iam.gserviceaccount.com",
        "client_id": "116672581777902320569",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9y40r%40ecommerce-db500.iam.gserviceaccount.com"
      }      
}

export default config;