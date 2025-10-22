import React from 'react';

// --- INTERFACES (Definindo os Tipos para TypeScript) ---

// Tipos para os dados do usuário (ajuste conforme seu back-end)
interface UserData {
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  xpNeeded: number;
  streak: number;
  rank: string;
  points: number;
  recentActivity: Activity[];
}

// Tipos para as atividades recentes
interface Activity {
  id: number;
  type: 'reciclagem' | 'quiz' | 'doacao'; // Tipos específicos
  description: string;
  date: string;
}

// Tipos para o componente StatCard
interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
}

// Tipos para o componente GoalCard
interface GoalCardProps {
  title: string;
  progress: number;
  reward: string;
}

// --- COMPONENTES ---

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-3xl mb-1">{icon}</span>
    <span className="text-xl font-bold text-white">{value}</span>
    <span className="text-xs text-gray-400">{label}</span>
  </div>
);

const GoalCard: React.FC<GoalCardProps> = ({ title, progress, reward }) => (
  <div className="p-4 bg-gray-700 rounded-lg">
    <h4 className="font-semibold text-lg mb-2">{title}</h4>
    <div className="w-full bg-gray-600 rounded-full h-2">
      <div
        className="bg-yellow-400 h-2 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <div className="flex justify-between text-sm mt-2 text-gray-400">
      <span>{progress}% Completo</span>
      <span className="text-yellow-400 font-bold">{reward}</span>
    </div>
  </div>
);

const UserSidebar: React.FC<{ user: UserData }> = ({ user }) => (
  <div className="w-full lg:w-1/4 p-6 bg-gray-800 rounded-lg shadow-xl text-white">
    <div className="flex flex-col items-center text-center">
      {/* Avatar do Usuário */}
      <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center text-4xl font-bold mb-4 border-4 border-white">
        {user.avatar || 'U'}
      </div>
      <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
      <p className="text-sm text-green-400">Nível {user.level} Reciclador</p>
    </div>

    <div className="mt-8 space-y-4">
      {/* Barra de Progresso do Nível */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>XP Total: {user.xp}</span>
          <span>Próximo Nível: {user.xpNeeded} XP</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${(user.xp / user.xpNeeded) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Estatísticas de Gamificação */}
      <div className="flex justify-around pt-4 border-t border-gray-700">
        <StatCard icon="🔥" value={user.streak} label="Ofensiva" />
        <StatCard icon="🏆" value={user.rank} label="Ranking" />
        <StatCard icon="✨" value={user.points} label="Pontos" />
      </div>
    </div>
  </div>
);

// Componente principal da Página de Usuário
const UserPage: React.FC = () => {
  // **Dados Mockados (Mantenha isso por enquanto):**
  const userData: UserData = {
    name: 'Nome do Usuário',
    email: 'user@example.com',
    avatar: 'A',
    level: 5,
    xp: 550,
    xpNeeded: 1000,
    streak: 15,
    rank: 'Ouro',
    points: 1250,
    recentActivity: [
      { id: 1, type: 'reciclagem', description: 'Reciclagem de 5kg de Plástico', date: '22/10' },
      { id: 2, type: 'quiz', description: 'Completou Quiz de Vidro', date: '21/10' },
      { id: 3, type: 'doacao', description: 'Doou 50 pontos para a causa', date: '20/10' },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Lado Esquerdo: Perfil e Estatísticas */}
        <UserSidebar user={userData} />

        {/* Lado Direito: Atividades e Metas */}
        <div className="w-full lg:w-3/4 space-y-8">
          {/* Card de Metas/Desafios (Estilo Duolingo) */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold text-green-400 mb-4">Desafios de Reciclagem</h3>
            <p className="text-gray-300 mb-4">Complete desafios para ganhar mais XP e Pontos!</p>
            
            <div className="space-y-3">
              <GoalCard 
                title="Meta Semanal: 10kg de Papel" 
                progress={70} 
                reward="50 XP" 
              />
              <GoalCard 
                title="Desafio de Vidro (Nível 2)" 
                progress={30} 
                reward="100 Pontos" 
              />
            </div>
          </div>

          {/* Card de Atividades Recentes */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Atividade Recente</h3>
            <ul className="space-y-3">
              {userData.recentActivity.map(activity => (
                <li key={activity.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-md">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">
                      {activity.type === 'reciclagem' && '♻️'}
                      {activity.type === 'quiz' && '🧠'}
                      {activity.type === 'doacao' && '💚'}
                    </span>
                    <p className="text-gray-200">{activity.description}</p>
                  </div>
                  <span className="text-sm text-gray-400">{activity.date}</span>
                </li>
              ))}
              <li className="text-center pt-3 text-green-400 cursor-pointer hover:underline">
                Ver todo o histórico
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;