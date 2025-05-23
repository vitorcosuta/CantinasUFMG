﻿namespace DataTransferObjects
{
    public class dtoProduto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public int idOwner { get; set; }
        public dtoUser? Owner { get; set; }

        //Propriedades adicionais
        public double? Preco {  get; set; }
        public List<dtoLanchonete>? Lanchonetes { get; set; }
    }
}
