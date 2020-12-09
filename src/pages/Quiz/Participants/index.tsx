import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import Card from '../../../components/Card';

import radiantIconImg from '../../../assets/images/radiant_icon.png';
import direIconImg from '../../../assets/images/dire_icon.png';

import {
  Container,
  Content,
  List,
  ListHeader,
  ParticipantCard,
} from './styles';
import Button from '../../../components/Button';

interface IParticipants {
  id: string;
  name: string;
  email: string;
  team: string;
}

const Participants: React.FC = () => {
  const [direParticipants, setDireParticipants] = useState<IParticipants[]>([]);

  const [radiantParticipants, setRadiantParticipants] = useState<
    IParticipants[]
  >([]);

  useEffect(() => {
    setDireParticipants([
      {
        id: '1',
        name: 'Gustavo Felipe',
        email: 'gustavo@gmail.com',
        team: 'dire',
      },
    ]);

    setRadiantParticipants([
      {
        id: '2',
        name: 'Michel Victor',
        email: 'michel@gmail.com',
        team: 'radiant',
      },
    ]);
  }, []);

  return (
    <Container>
      <Content>
        <ListHeader>
          <div>
            <img src={radiantIconImg} alt="radiant icon" />
            <h4>Iluminados</h4>
          </div>
          <Button color="secondary">
            <FiPlus size={30} />
          </Button>
        </ListHeader>
        <List>
          {radiantParticipants.map(participant => (
            <Card key={participant.id}>
              <ParticipantCard>
                <h4>{participant.name}</h4>
                <p>{participant.email}</p>
              </ParticipantCard>
            </Card>
          ))}
        </List>
      </Content>
      <Content>
        <ListHeader>
          <div>
            <img src={direIconImg} alt="dire icon" />
            <h4>Temidos</h4>
          </div>
          <Button color="secondary">
            <FiPlus size={30} />
          </Button>
        </ListHeader>
        <List>
          {direParticipants.map(participant => (
            <Card key={participant.id}>
              <ParticipantCard>
                <h4>{participant.name}</h4>
                <p>{participant.email}</p>
              </ParticipantCard>
            </Card>
          ))}
        </List>
      </Content>
    </Container>
  );
};

export default Participants;
