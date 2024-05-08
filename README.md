# Toxic-comment-detector-AI

Your Fast, Free, AI-Powered Toxic Comment Detector
Detecting toxic comment has traditionally been slow and costly. But not anymore. With HateHoundAPI, you can now swiftly identify and filter out toxic content in your web applications. Powered by state-of-the-art AI technology, HateHoundAPI offers:

## Demo

https://hate-hound-api.vercel.app/

## API Usage

#### Make predict

```
  POST /api/predict
```

| parameter      | Type     | Description                                                                             |
| :------------- | :------- | :-------------------------------------------------------------------------------------- |
| `comment`      | `string` | **Required**. The comment you want to predict                                           |
| `access_token` | `string` | **Required**. You can go to our website, connect your github and get this access_token. |

## API Input Example

    const res = await fetch("https://hate-hound-api.vercel.app/api/predict", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comment , access_token}),
    })

## API Output

    HTTP/1.1  201
    Location: /api/predict
    Content-Type: application/json

    {
    "comment": "<your-comment>",
    "duration": 0.1196323779999986,
    "results": {
        "toxic": true,
        "severe_toxic": true,
        "obscene": true,
        "threat": false,
        "insult": true,
        "identity_hate": false
    },
    "prediction_probs": {
        "toxic": 0.9350948333740234,
        "severe_toxic": 0.4974823296070099,
        "obscene": 0.9486715793609619,
        "threat": 0.13421966135501862,
        "insult": 0.7589452862739563,
        "identity_hate": 0.22608500719070435
    }

## Support

For support you can just star this project

## Licence

[MIT](https://choosealicense.com/licenses/mit/)
