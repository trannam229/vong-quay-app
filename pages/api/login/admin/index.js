export default function handler(req, res) {
  const data = req.body;
  if (data.appId == 1 && data.username == "admin" && data.password == "123456"){
    res.status(200).json({
      "accessToken": "XXXXXXXXXXXXXXXXXXXXXXXX",
      "tokenType": "type"
    });
  } else {
    res.status(404)
    res.send({});
  }
}