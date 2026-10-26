# Task Manager — To-Do App

Uma aplicação web simples para gerir tarefas, desenvolvida com **HTML, CSS e JavaScript vanilla**. Permite criar tarefas, acompanhar o que está pendente ou concluído e guardar os dados localmente no navegador.

## Funcionalidades

- **Criar tarefas:** adiciona tarefas com uma descrição.
- **Validação de entrada:** impede a criação de tarefas vazias e de tarefas com o mesmo texto.
- **Separação por estado:** consulta listas de tarefas pendentes e concluídas.
- **Concluir tarefas:** seleciona uma tarefa pendente para a marcar como concluída.
- **Eliminar tarefas:** remove tarefas após confirmação.
- **Persistência local:** guarda as tarefas em `localStorage`, mantendo os dados no mesmo navegador entre sessões.
- **Mensagens de feedback:** apresenta notificações quando uma tarefa é criada, concluída ou eliminada.
- **Interação por teclado:** as listas e os filtros incluem suporte para teclado; numa tarefa, `Enter` conclui a tarefa pendente e `Ctrl + Alt + D` solicita a sua eliminação.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (sem frameworks)
- [Google Fonts — Roboto](https://fonts.google.com/specimen/Roboto)
- [Font Awesome 6.7.2](https://fontawesome.com/)

## Como executar

A aplicação é estática e não necessita de instalação de dependências nem de um servidor backend.

1. Clona ou descarrega este repositório.
2. Abre o ficheiro `index.html` num navegador moderno.

Também pode ser publicada através do **GitHub Pages**, usando a branch e a pasta configuradas nas definições do repositório.

## Estrutura do projeto

```text
.
├── index.html                 # Estrutura da aplicação
├── css/
│   └── style.css              # Estilos e componentes visuais
├── js/
│   ├── controller.js          # Estado, operações das tarefas e componentes da UI
│   ├── list.js                # Validação, criação e renderização das listas
│   └── filter.js              # Interação com os filtros de tarefas
└── FeedbackMessague/
    ├── script.js              # Criação de notificações de feedback
    └── style.css              # Estilos das notificações
```

## Como funciona o armazenamento

As tarefas são guardadas no `localStorage` do navegador, na chave `dataTask`. Cada tarefa contém:

- `id`: identificador numérico;
- `task`: descrição da tarefa;
- `isCompleted`: indica se a tarefa está concluída (`true`) ou pendente (`false`).

Os dados são locais ao navegador e ao perfil utilizado. Não existe sincronização entre dispositivos nem armazenamento num servidor.

> **Nota:** limpar os dados do site ou o armazenamento do navegador pode apagar as tarefas guardadas.

## Limitações conhecidas

- A aplicação não utiliza uma API nem uma base de dados remota.
- As tarefas não são partilhadas entre navegadores ou dispositivos.
- A interface e as mensagens estão atualmente, em grande parte, em inglês, embora existam mensagens de validação em português.

## Licença

Consulta o ficheiro [LICENSE](LICENSE) para conhecer os termos de utilização.
