-- Criação das tabelas
CREATE TABLE IF NOT EXISTS question (
    id VARCHAR(36) PRIMARY KEY,
    text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS choice (
    id VARCHAR(36) PRIMARY KEY,
    text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    question_id VARCHAR(36),
    FOREIGN KEY (question_id) REFERENCES question(id)
);

-- Inserção das questões
INSERT INTO question (id, text) VALUES
(UUID(), 'Qual o principal propósito de uma VPN?'),
(UUID(), 'Qual ataque envolve enviar e-mails fraudulentos para enganar vítimas?'),
(UUID(), 'O que significa "2FA" em segurança?'),
(UUID(), 'Qual malware criptografa arquivos e exige pagamento?'),
(UUID(), 'O que é uma vulnerabilidade zero-day?'),
(UUID(), 'Qual protocolo fornece navegação web segura?'),
(UUID(), 'Qual o principal risco de redes Wi-Fi públicas?'),
(UUID(), 'Qual ferramenta é usada para quebra de senhas?'),
(UUID(), 'O que significa DDoS?'),
(UUID(), 'Qual NÃO é um método de autenticação biométrica?'),
(UUID(), 'Qual o propósito de um firewall?'),
(UUID(), 'Qual prática reduz vulnerabilidade de senhas?'),
(UUID(), 'O que a criptografia TLS protege?'),
(UUID(), 'Qual ataque usa sites falsos para roubar credenciais?'),
(UUID(), 'O que é engenharia social?'),
(UUID(), 'Qual tipo de arquivo tem maior probabilidade de conter malware?'),
(UUID(), 'O que é o princípio do menor privilégio?'),
(UUID(), 'Qual controle de segurança protege contra SQL injection?'),
(UUID(), 'O que significa IDS?'),
(UUID(), 'Qual é uma medida de segurança física?'),
(UUID(), 'O que é uma honeypot?'),
(UUID(), 'Qual método de criptografia é assimétrico?'),
(UUID(), 'O que fazer após uma violação de dados?'),
(UUID(), 'Qual vulnerabilidade permite execução de código via campos de entrada?'),
(UUID(), 'Qual o principal propósito do hashing?'),
(UUID(), 'Qual framework de segurança é padronizado pela ISO?'),
(UUID(), 'O que significa CIA no contexto de segurança?'),
(UUID(), 'Qual prática previne tailgating?'),
(UUID(), 'O que é shimming em segurança cibernética?'),
(UUID(), 'Qual lei protege dados de saúde nos EUA?');

-- Inserção das alternativas
-- Questão 1
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Ocultar endereço IP', TRUE, id FROM question LIMIT 1 OFFSET 0;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Aumentar velocidade da internet', FALSE, id FROM question LIMIT 1 OFFSET 0;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Contornar restrições geográficas', TRUE, id FROM question LIMIT 1 OFFSET 0;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Reduzir custos de hardware', FALSE, id FROM question LIMIT 1 OFFSET 0;

-- Questão 2
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Phishing', TRUE, id FROM question LIMIT 1 OFFSET 1;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Força bruta', FALSE, id FROM question LIMIT 1 OFFSET 1;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Injeção de SQL', FALSE, id FROM question LIMIT 1 OFFSET 1;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Spoofing de DNS', FALSE, id FROM question LIMIT 1 OFFSET 1;

-- Questão 3
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Autenticação de Dois Fatores', TRUE, id FROM question LIMIT 1 OFFSET 2;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Segundo Firewall de Acesso', FALSE, id FROM question LIMIT 1 OFFSET 2;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Algoritmo de Dupla Frequência', FALSE, id FROM question LIMIT 1 OFFSET 2;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Arquivo de Dois Arquivos', FALSE, id FROM question LIMIT 1 OFFSET 2;

-- Questão 4
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Ransomware', TRUE, id FROM question LIMIT 1 OFFSET 3;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Spyware', FALSE, id FROM question LIMIT 1 OFFSET 3;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Adware', FALSE, id FROM question LIMIT 1 OFFSET 3;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Trojan', FALSE, id FROM question LIMIT 1 OFFSET 3;

-- Questão 5
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Falha desconhecida sem correção disponível', TRUE, id FROM question LIMIT 1 OFFSET 4;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Ataque que ocorre à meia-noite', FALSE, id FROM question LIMIT 1 OFFSET 4;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Vulnerabilidade de dia de pagamento', FALSE, id FROM question LIMIT 1 OFFSET 4;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Problema corrigido em 24 horas', FALSE, id FROM question LIMIT 1 OFFSET 4;

-- Questão 6
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'HTTPS', TRUE, id FROM question LIMIT 1 OFFSET 5;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'FTP', FALSE, id FROM question LIMIT 1 OFFSET 5;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'HTTP', FALSE, id FROM question LIMIT 1 OFFSET 5;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'SMTP', FALSE, id FROM question LIMIT 1 OFFSET 5;

-- Questão 7
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Interceptação de dados', TRUE, id FROM question LIMIT 1 OFFSET 6;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Velocidade lenta de conexão', FALSE, id FROM question LIMIT 1 OFFSET 6;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Compatibilidade limitada de dispositivos', FALSE, id FROM question LIMIT 1 OFFSET 6;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Alto consumo de bateria', FALSE, id FROM question LIMIT 1 OFFSET 6;

-- Questão 8
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'John the Ripper', TRUE, id FROM question LIMIT 1 OFFSET 7;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Wireshark', FALSE, id FROM question LIMIT 1 OFFSET 7;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Nmap', FALSE, id FROM question LIMIT 1 OFFSET 7;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Metasploit', FALSE, id FROM question LIMIT 1 OFFSET 7;

-- Questão 9
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Ataque de Negação de Serviço Distribuído', TRUE, id FROM question LIMIT 1 OFFSET 8;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Defesa Distribuída de Sistemas', FALSE, id FROM question LIMIT 1 OFFSET 8;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Detecção de Dispositivos de Segurança', FALSE, id FROM question LIMIT 1 OFFSET 8;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Desenvolvimento de Software Defensivo', FALSE, id FROM question LIMIT 1 OFFSET 8;

-- Questão 10
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Senha de PIN', TRUE, id FROM question LIMIT 1 OFFSET 9;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Reconhecimento facial', FALSE, id FROM question LIMIT 1 OFFSET 9;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Impressão digital', FALSE, id FROM question LIMIT 1 OFFSET 9;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Reconhecimento de íris', FALSE, id FROM question LIMIT 1 OFFSET 9;

-- Questão 11
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Filtrar tráfego de rede', TRUE, id FROM question LIMIT 1 OFFSET 10;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Aumentar velocidade de internet', FALSE, id FROM question LIMIT 1 OFFSET 10;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Gerenciar conexões VPN', FALSE, id FROM question LIMIT 1 OFFSET 10;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Detectar vírus em arquivos', FALSE, id FROM question LIMIT 1 OFFSET 10;

-- Questão 12
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Usar gerenciador de senhas', TRUE, id FROM question LIMIT 1 OFFSET 11;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Compartilhar senhas com colegas', FALSE, id FROM question LIMIT 1 OFFSET 11;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Usar mesma senha em múltiplos sites', FALSE, id FROM question LIMIT 1 OFFSET 11;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Criar senhas baseadas em dados pessoais', FALSE, id FROM question LIMIT 1 OFFSET 11;

-- Questão 13
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Dados em trânsito', TRUE, id FROM question LIMIT 1 OFFSET 12;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Backups em nuvem', FALSE, id FROM question LIMIT 1 OFFSET 12;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Arquivos armazenados localmente', FALSE, id FROM question LIMIT 1 OFFSET 12;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Configurações de BIOS', FALSE, id FROM question LIMIT 1 OFFSET 12;

-- Questão 14
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Pharming', TRUE, id FROM question LIMIT 1 OFFSET 13;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Bluejacking', FALSE, id FROM question LIMIT 1 OFFSET 13;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Vishing', FALSE, id FROM question LIMIT 1 OFFSET 13;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'War driving', FALSE, id FROM question LIMIT 1 OFFSET 13;

-- Questão 15
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Manipulação psicológica para obter informações', TRUE, id FROM question LIMIT 1 OFFSET 14;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Projeto de redes sociais', FALSE, id FROM question LIMIT 1 OFFSET 14;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Engenharia de software segura', FALSE, id FROM question LIMIT 1 OFFSET 14;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Gerenciamento de projetos de TI', FALSE, id FROM question LIMIT 1 OFFSET 14;

-- Questão 16
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), '.exe', TRUE, id FROM question LIMIT 1 OFFSET 15;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), '.txt', FALSE, id FROM question LIMIT 1 OFFSET 15;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), '.jpg', FALSE, id FROM question LIMIT 1 OFFSET 15;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), '.mp3', FALSE, id FROM question LIMIT 1 OFFSET 15;

-- Questão 17
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Dar apenas permissões necessárias', TRUE, id FROM question LIMIT 1 OFFSET 16;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Fornecer acesso total a todos', FALSE, id FROM question LIMIT 1 OFFSET 16;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Permitir acesso físico irrestrito', FALSE, id FROM question LIMIT 1 OFFSET 16;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Ignorar políticas de senha', FALSE, id FROM question LIMIT 1 OFFSET 16;

-- Questão 18
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Prepared statements', TRUE, id FROM question LIMIT 1 OFFSET 17;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Firewalls de rede', FALSE, id FROM question LIMIT 1 OFFSET 17;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Antivírus', FALSE, id FROM question LIMIT 1 OFFSET 17;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Criptografia de disco', FALSE, id FROM question LIMIT 1 OFFSET 17;

-- Questão 19
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Sistema de Detecção de Intrusão', TRUE, id FROM question LIMIT 1 OFFSET 18;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Identificação de Dispositivo Seguro', FALSE, id FROM question LIMIT 1 OFFSET 18;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Integração de Defesa de Sistemas', FALSE, id FROM question LIMIT 1 OFFSET 18;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Isolamento de Dados Sensíveis', FALSE, id FROM question LIMIT 1 OFFSET 18;

-- Questão 20
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Leitor biométrico', TRUE, id FROM question LIMIT 1 OFFSET 19;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Firewall', FALSE, id FROM question LIMIT 1 OFFSET 19;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Antivírus', FALSE, id FROM question LIMIT 1 OFFSET 19;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'VPN', FALSE, id FROM question LIMIT 1 OFFSET 19;

-- Questão 21
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Sistema isca para atrair atacantes', TRUE, id FROM question LIMIT 1 OFFSET 20;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Tipo de malware', FALSE, id FROM question LIMIT 1 OFFSET 20;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Dispositivo de armazenamento seguro', FALSE, id FROM question LIMIT 1 OFFSET 20;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Técnica de criptografia', FALSE, id FROM question LIMIT 1 OFFSET 20;

-- Questão 22
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'RSA', TRUE, id FROM question LIMIT 1 OFFSET 21;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'AES', FALSE, id FROM question LIMIT 1 OFFSET 21;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'DES', FALSE, id FROM question LIMIT 1 OFFSET 21;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Blowfish', FALSE, id FROM question LIMIT 1 OFFSET 21;

-- Questão 23
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Notificar autoridades e afetados', TRUE, id FROM question LIMIT 1 OFFSET 22;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Ocultar o incidente', FALSE, id FROM question LIMIT 1 OFFSET 22;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Desligar todos os sistemas permanentemente', FALSE, id FROM question LIMIT 1 OFFSET 22;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Ignorar e continuar operações', FALSE, id FROM question LIMIT 1 OFFSET 22;

-- Questão 24
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Injeção de código', TRUE, id FROM question LIMIT 1 OFFSET 23;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Cross-site scripting', FALSE, id FROM question LIMIT 1 OFFSET 23;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Clickjacking', FALSE, id FROM question LIMIT 1 OFFSET 23;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'DNS poisoning', FALSE, id FROM question LIMIT 1 OFFSET 23;

-- Questão 25
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Proteger integridade de dados', TRUE, id FROM question LIMIT 1 OFFSET 24;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Acelerar acesso a banco de dados', FALSE, id FROM question LIMIT 1 OFFSET 24;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Reduzir tamanho de arquivos', FALSE, id FROM question LIMIT 1 OFFSET 24;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Melhorar compressão de dados', FALSE, id FROM question LIMIT 1 OFFSET 24;

-- Questão 26
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'ISO 27001', TRUE, id FROM question LIMIT 1 OFFSET 25;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'PCI DSS', FALSE, id FROM question LIMIT 1 OFFSET 25;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'NIST SP 800-53', FALSE, id FROM question LIMIT 1 OFFSET 25;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'GDPR', FALSE, id FROM question LIMIT 1 OFFSET 25;

-- Questão 27
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Confidencialidade, Integridade, Disponibilidade', TRUE, id FROM question LIMIT 1 OFFSET 26;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Central Intelligence Agency', FALSE, id FROM question LIMIT 1 OFFSET 26;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Controle de Incidentes de Ataque', FALSE, id FROM question LIMIT 1 OFFSET 26;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Certificação de Infraestrutura de Acesso', FALSE, id FROM question LIMIT 1 OFFSET 26;

-- Questão 28
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Portas giratórias', TRUE, id FROM question LIMIT 1 OFFSET 27;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Firewalls', FALSE, id FROM question LIMIT 1 OFFSET 27;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Autenticação de dois fatores', FALSE, id FROM question LIMIT 1 OFFSET 27;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Criptografia de e-mail', FALSE, id FROM question LIMIT 1 OFFSET 27;

-- Questão 29
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Inserir camada maliciosa entre hardware/software', TRUE, id FROM question LIMIT 1 OFFSET 28;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Técnica de compartilhamento de arquivos', FALSE, id FROM question LIMIT 1 OFFSET 28;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Método de compactação de dados', FALSE, id FROM question LIMIT 1 OFFSET 28;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'Protocolo de rede segura', FALSE, id FROM question LIMIT 1 OFFSET 28;

-- Questão 30
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'HIPAA', TRUE, id FROM question LIMIT 1 OFFSET 29;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'GDPR', FALSE, id FROM question LIMIT 1 OFFSET 29;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'PCI DSS', FALSE, id FROM question LIMIT 1 OFFSET 29;
INSERT INTO choice (id, text, is_correct, question_id)
SELECT UUID(), 'SOX', FALSE, id FROM question LIMIT 1 OFFSET 29;