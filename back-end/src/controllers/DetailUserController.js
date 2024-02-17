import { DetailUserService } from "../services/DetailUserServices.js";

export class DetailUserController {
  async handle(req, res) {
    console.log(req)
      try {
          const userId = req.userId; 

          const detailService = new DetailUserService();
          const userDetails = await detailService.execute(userId);
          return res.status(200).json(userDetails);
      } catch (error) {
          res.status(500).json({ message: "Erro ao processar a solicitação" });
      }
  }
}

export default DetailUserController; // Adicionando exportação padrão
