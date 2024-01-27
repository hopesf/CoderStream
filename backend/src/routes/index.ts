import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

router.post('/auth', (req:Request, res:Response) => {
  // // sunucu sadece nginx'e açık
  // const streamkey = req.body.key;

  // // istersek burada veritbanına bağlanıp kullanıcıları kontrol edebiliriz
  // if (streamkey === 'supersecret') {
  //   res.status(200).send();
  //   return;
  // }

  // //   yayını reddet
  // res.status(403).send();

//! eğer stream key istemiyorsak bu şekilde auth aşamasını geçebiliriz.
//! Alt satırı yorum satırı yaparsanız yukarıdaki yorum satırını kaldırın.
  res.status(200).send();
});
export default router;
