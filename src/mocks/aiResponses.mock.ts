import type { AiCommandResponse } from '../types/agent';

export const mockAiResponses: Record<string, AiCommandResponse> = {
  comments: {
    id: 'ai-resp-comments',
    query: 'Подготовь комменты для очереди',
    title: 'Подготовка авторских комментариев',
    summary:
      'ИИ проанализировал 11 постов в очереди: сгенерировано 11 уникальных текстов от 5 до 8 слов без клише с проверкой анти-дублей.',
    badge: '11 текстов готовы',
    timestamp: 'Только что',
    steps: [
      { id: 's1', text: 'Анализ контекста публикации автора', status: 'done' },
      { id: 's2', text: 'Фильтрация стоп-слов и штампов («Супер», «Огонь»)', status: 'done' },
      { id: 's3', text: 'Проверка базы дублей за 14 дней (0 совпадений)', status: 'done' },
      { id: 's4', text: 'Готово к утверждению в очередь посева', status: 'done' },
    ],
  },
  debtors: {
    id: 'ai-resp-debtors',
    query: 'Проверь должников по лайкам',
    title: 'Аудит должников и неактивных авторов',
    summary:
      'Найдено 3 аккаунта с задержкой взаимного актива более 24ч. Одному направлен мягкий пинг в Direct.',
    badge: '3 должника',
    timestamp: 'Только что',
    steps: [
      { id: 'd1', text: 'Сверка хешей лайков и репостов из SQLite', status: 'done' },
      { id: 'd2', text: 'Учёт донорских аккаунтов (Primary ↔ Donor)', status: 'done' },
      { id: 'd3', text: 'Сформирован черновик питча (lead-pitch)', status: 'done' },
    ],
  },
  default: {
    id: 'ai-resp-general',
    query: 'Запрос к ИИ-агенту',
    title: 'Ответ синтетического интеллекта Aura v4.2',
    summary:
      'Команда обработана с соблюдением интервалов безопасности (темп 14/20 в час). Готов к следующему шагу.',
    badge: 'Aura-Clean v4.2',
    timestamp: 'Только что',
    steps: [
      { id: 'g1', text: 'Проверка параметров лимитов safety_guard.py', status: 'done' },
      { id: 'g2', text: 'Выполнение запроса и синхронизация очередей', status: 'done' },
    ],
  },
};
