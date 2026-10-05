# Usar no celular

A interface se adapta ao celular e ao tablet. No gerador, use **Preencher** para
editar os dados e **Revisar contrato** para conferir as seis páginas. O menu ☰
permite ir a uma etapa, limpar o formulário e sair. A prévia no celular ajusta
o texto à tela; a impressão continua em A4.

## Acessar pelo Wi-Fi

1. Conecte o computador e o celular à mesma rede Wi-Fi privada.
2. Inicie o backend normalmente, na porta 8001.
3. Na pasta do projeto, execute `npm run start:mobile`. Se usou
   `INICIAR_NOBE.bat`, feche apenas a janela **Nobe Angular** antes de executar
   esse comando; mantenha a janela do backend aberta.
4. No computador, execute `ipconfig` e localize o endereço IPv4 do adaptador
   Wi-Fi/Ethernet conectado. Exemplo: `192.168.1.20`.
5. No navegador do celular, abra `http://192.168.1.20:4200`, substituindo o IP
   pelo endereço do computador. Não use `localhost` no celular.

O computador precisa continuar ligado e os dois servidores precisam permanecer
em execução. Se o Windows pedir permissão para o Node.js, permita na rede
privada. Redes de convidados podem impedir a conexão entre dispositivos.

As chamadas `/api` passam pelo servidor Angular até o backend local; não é
necessário expor a porta 8001. `npm start` continua limitado ao computador.
O servidor de desenvolvimento é para testes na rede local. Para acesso pela
internet e instalação como aplicativo, publique a aplicação com HTTPS e
encaminhe `/api` para o backend no mesmo domínio.

## PDF

**Gerar PDF** abre a impressão do navegador. Use a opção de salvar como PDF
ou compartilhar disponível no navegador/sistema do celular. A disponibilidade
dessa opção depende do navegador; prefira abrir o portal no Safari ou Chrome
em vez do navegador interno de aplicativos de mensagens.
