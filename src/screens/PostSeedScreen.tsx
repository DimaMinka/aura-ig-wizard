import { useState, useEffect } from 'react';
import { useAgent } from '../services/AgentContext';
import { StepProgressBar } from '../components/seeder/StepProgressBar';
import { ReelsInputCard } from '../components/seeder/ReelsInputCard';
import { PreFlightChatList } from '../components/seeder/PreFlightChatList';
import { DebtClearanceWidget } from '../components/seeder/DebtClearanceWidget';
import { ScheduleSelector } from '../components/seeder/ScheduleSelector';
import { initialReelsInput, initialScheduleOptions } from '../mocks/seeder.mock';
import type { PreFlightChat, DebtComment } from '../types/seeder';

export function PostSeedScreen() {
  const { service } = useAgent();
  const [chats, setChats] = useState<PreFlightChat[]>([]);
  const [debt, setDebt] = useState<DebtComment | null>(null);

  useEffect(() => {
    service.getPreFlightChats().then(setChats);
    service.getDebtComment().then(setDebt);
  }, [service]);

  const handleApplyDebt = async (commentId: string) => {
    await service.applyDebtComments(commentId);
    const updatedChats = await service.getPreFlightChats();
    const updatedDebt = await service.getDebtComment();
    setChats(updatedChats);
    setDebt(updatedDebt);
  };

  const handlePlan = async (scheduleId: string) => {
    await service.planSeeding(scheduleId);
  };

  return (
    <div className="flex flex-col w-full pb-4">
      <StepProgressBar currentStep={2} totalSteps={3} />
      <ReelsInputCard post={initialReelsInput} />
      <PreFlightChatList chats={chats} />
      {debt && <DebtClearanceWidget debt={debt} onApply={handleApplyDebt} />}
      <ScheduleSelector options={initialScheduleOptions} onConfirm={handlePlan} />
    </div>
  );
}
