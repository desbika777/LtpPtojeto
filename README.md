# LTP - Lista de Tarefas Pessoais 📝

Um sistema moderno e interativo de gerenciamento de tarefas pessoais desenvolvido com HTML, CSS e JavaScript vanilla.

## ✨ Características

### 🎨 Design Moderno
- Interface limpa e intuitiva
- Gradientes e animações suaves
- Responsivo para todos os dispositivos
- Tema inspirado nos melhores apps de To-Do List

### 🔐 Sistema de Autenticação
- Página de login e registro
- Validação de formulários
- Sessão de usuário persistente
- Interface de usuário personalizada

### 📋 Gerenciamento de Tarefas
- Adicionar tarefas com facilidade
- Classificação por dificuldade (Fácil, Médio, Difícil)
- Categorização (Pessoal, Trabalho, Estudos, Saúde, Compras, Outros)
- Definição de datas de vencimento
- Marcar como concluída/pendente
- Editar tarefas existentes
- Excluir tarefas individuais
- Limpar todas as tarefas concluídas

### 📊 Estatísticas e Filtros
- Dashboard com estatísticas em tempo real
- Total de tarefas, concluídas, pendentes e progresso
- Filtros por status (Todas, Pendentes, Concluídas, Hoje)
- Ordenação por data, dificuldade, categoria ou ordem alfabética
- Indicadores visuais para tarefas atrasadas

### 📅 Calendário Interativo
- Visualização mensal das tarefas
- Destaque para dias com tarefas
- Indicação de tarefas atrasadas
- Detalhes das tarefas por data selecionada
- Navegação entre meses

### ❓ Sistema de Ajuda
- Modal com instruções completas
- Dicas de uso e melhores práticas
- Explicação de todos os recursos
- Guia visual com ícones

### 💾 Persistência de Dados
- Armazenamento local no navegador
- Sessão de usuário mantida
- Backup automático das tarefas
- Sincronização em tempo real

## 🚀 Como Usar

### 1. Primeiro Acesso
1. Acesse `index.php` em um servidor com PHP habilitado (ex.: localhost)
2. Clique em "Cadastre-se" para criar uma conta
3. Preencha seus dados e aceite os termos
4. Você será redirecionado para o dashboard

### 2. Fazendo Login
1. Na página inicial, digite seu e-mail e senha
2. Clique em "Entrar" para acessar suas tarefas
3. Marque "Lembrar de mim" para login automático

### 3. Adicionando Tarefas
1. No dashboard, digite sua tarefa no campo de entrada
2. Selecione a dificuldade (🟢 Fácil, 🟡 Médio, 🔴 Difícil)
3. Escolha uma data de vencimento
4. Selecione a categoria apropriada
5. Clique no botão "+" para adicionar

### 4. Gerenciando Tarefas
- **Concluir**: Clique no círculo à esquerda da tarefa
- **Editar**: Clique no ícone de lápis
- **Excluir**: Clique no ícone de lixeira
- **Filtrar**: Use as abas de filtro no topo
- **Ordenar**: Use o seletor de ordenação

### 5. Usando o Calendário
1. Clique no ícone de calendário no cabeçalho
2. Navegue pelos meses usando as setas
3. Clique em uma data para ver as tarefas
4. Observe as cores: azul = com tarefas, vermelho = atrasadas

### 6. Obtendo Ajuda
1. Clique no ícone "?" no cabeçalho
2. Leia as instruções detalhadas
3. Consulte as dicas importantes
4. Feche o modal quando terminar

## 🛠️ Estrutura do Projeto

```
LTP-TaskManager/
├── index.php               # Página de login/registro (PHP)
├── dashboard.php           # Dashboard principal (PHP)
├── assets/
│   ├── css/
│   │   ├── auth.css        # Estilos da autenticação
│   │   └── dashboard.css   # Estilos do dashboard
│   ├── js/
│   │   ├── auth.js         # Lógica de autenticação
│   │   └── dashboard.js    # Lógica do dashboard
│   └── images/             # Imagens do projeto
└── README.md               # Este arquivo
```

## 🎯 Recursos Técnicos

### Frontend
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Flexbox, Grid, animações e responsividade
- **JavaScript ES6+**: Classes, async/await, modules
- **Font Awesome**: Ícones vetoriais
- **Google Fonts**: Tipografia Poppins

### Funcionalidades
- **LocalStorage**: Persistência de dados
- **Responsive Design**: Mobile-first
- **Progressive Enhancement**: Funciona sem JavaScript
- **Accessibility**: ARIA labels e navegação por teclado
- **Performance**: Otimizado para carregamento rápido

### Compatibilidade
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 🌟 Funcionalidades Avançadas

### Notificações
- Feedback visual para todas as ações
- Diferentes tipos: sucesso, erro, informação
- Auto-dismiss após 3 segundos
- Animações suaves

### Animações
- Transições suaves entre estados
- Efeitos de hover interativos
- Partículas de fundo animadas
- Loading states durante operações

### Estado da Interface
- Empty states para listas vazias
- Loading indicators
- Estados de erro com recovery
- Feedback visual imediato

### Validações
- Validação em tempo real de formulários
- Mensagens de erro contextuais
- Prevenção de dados inválidos
- Sanitização de entrada

## 🔧 Personalização

### Cores
O projeto usa um esquema de cores baseado em gradientes azul-roxo. Para alterar:

1. Edite as variáveis CSS nos arquivos de estilo
2. Principais cores:
   - Primária: `#667eea` (azul)
   - Secundária: `#764ba2` (roxo)
   - Sucesso: `#4CAF50` (verde)
   - Erro: `#f44336` (vermelho)
   - Aviso: `#FF9800` (laranja)

### Tipografia
- Fonte principal: Poppins (Google Fonts)
- Pesos disponíveis: 300, 400, 500, 600, 700
- Fallback: system fonts

### Categorias e Dificuldades
Para adicionar novas opções:

1. Edite os elementos `<select>` no HTML
2. Atualize os objetos de mapeamento no JavaScript
3. Adicione os ícones correspondentes

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

### Adaptações Mobile
- Menu hambúrguer para navegação
- Campos de formulário otimizados para touch
- Espaçamento adequado para dedos
- Orientação portrait/landscape

## 🔒 Segurança

### Dados do Usuário
- Armazenamento apenas local (LocalStorage)
- Nenhum dado enviado para servidores externos
- Criptografia básica para senhas (base64)
- Sessão expira ao fechar o navegador

### Validações
- Sanitização de entrada de dados
- Validação de e-mail
- Limites de tamanho para textos
- Prevenção de XSS básica

## 🚀 Melhorias Futuras

### Recursos Planejados
- [ ] Sincronização em nuvem
- [ ] Colaboração em equipe
- [ ] Notificações push
- [ ] Temas personalizáveis
- [ ] Exportação de dados
- [ ] Integração com calendários
- [ ] Relatórios de produtividade
- [ ] Lembretes por e-mail
- [ ] API REST
- [ ] Aplicativo mobile

### Otimizações
- [ ] Service Workers para PWA
- [ ] Lazy loading de imagens
- [ ] Minificação de assets
- [ ] CDN para recursos estáticos
- [ ] Compressão gzip
- [ ] Bundle splitting

## 🤝 Contribuição

Para contribuir com o projeto:

1. Fork o repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Abra um Pull Request
5. Aguarde a revisão

### Padrões de Código
- Use Prettier para formatação
- Siga as convenções ES6+
- Mantenha funções pequenas e focadas
- Documente código complexo
- Teste em múltiplos navegadores

## 📄 Licença

Este projeto está sob a licença MIT. Você pode usar, modificar e distribuir livremente.

## 👨‍💻 Autor

Desenvolvido com ❤️ para o projeto LTP - Lista de Tarefas Pessoais.

---

**LTP** - Organize sua vida de forma simples e eficiente! 🎯
