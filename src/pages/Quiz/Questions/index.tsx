import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiCircle, FiPlus } from 'react-icons/fi';
import Button from '../../../components/Button';

import {
  Container,
  Content,
  Options,
  Question,
  TeamIcon,
  Option,
  QuestionContent,
  QuestionActions,
} from './styles';

interface IOption {
  id: string;
  description: string;
  is_correct: boolean;
  question_id: string;
}

interface IQuestion {
  id: string;
  description: string;
  team: 'radiant' | 'dire';
  level: 1 | 2;
  is_selected: boolean;
  options: IOption[];
}

const teamsMap = {
  radiant: 'Iluminados',
  dire: 'Temidos',
};

interface QuestionsProps {
  questions: IQuestion[];
}

const Questions: React.FC<QuestionsProps> = ({ questions }) => {
  // const [questions, setQuestions] = useState<IQuestion[]>([]);

  return (
    <Container>
      <Content>
        {questions.length > 0 &&
          questions.map(question => (
            <Question key={question.id}>
              <QuestionContent>
                <div>
                  <TeamIcon team={question.team} />
                  <p>{teamsMap[question.team]}</p>
                </div>
                <div>{question.description}</div>
                <Options>
                  {question.options?.map(option => (
                    <Option key={option.id} is_selected={option.is_correct}>
                      {option.is_correct ? (
                        <FiCheckCircle size={20} />
                      ) : (
                        <FiCircle size={20} />
                      )}
                      {option.description}
                    </Option>
                  ))}
                </Options>
              </QuestionContent>
              <QuestionActions>
                <Button color="secondary">
                  <FiPlus size={30} />
                </Button>
              </QuestionActions>
            </Question>
          ))}
      </Content>
    </Container>
  );
};

export default Questions;
