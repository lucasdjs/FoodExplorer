import { DetailUserService } from "../services/DetailUserServices.js";

export class DetailUserController {
  async handle(req, res) {
    try {
      const detailService = new DetailUserService();
      const result = await detailService.execute();
      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Erro ao processar a solicitação" });
    }
  }
}

export default DetailUserController; // Adicionando exportação padrão
