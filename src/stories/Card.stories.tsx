import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';

import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardMedia, CardContent, CardActions } from '../components/ui/Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicCard: Story = {
  render: () => (
    <Card>
      <CardContent>
        <h2 style={{ margin: '0 0 8px 0' }}>Card Title</h2>
        <p style={{ margin: 0, color: 'rgba(0, 0, 0, 0.6)' }}>
          This is a basic card with simple content. Cards can contain various content and actions.
        </p>
      </CardContent>
      <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Card>
      <CardHeader title='Card with Header' subheader='September 14, 2024' />
      <CardContent>
        <p style={{ margin: 0 }}>This card includes a header with title and subheader.</p>
      </CardContent>
    </Card>
  ),
};

export const WithMedia: Story = {
  render: () => (
    <Card style={{ maxWidth: '345px' }}>
      <CardMedia
        component='div'
        height={140}
        image='https://via.placeholder.com/345x140/1976d2/ffffff?text=Card+Image'
        alt='Placeholder'
      />
      <CardContent>
        <h2 style={{ margin: '0 0 8px 0' }}>Beautiful Landscape</h2>
        <p style={{ margin: 0, color: 'rgba(0, 0, 0, 0.6)' }}>
          This card includes media content at the top. The image fills the width of the card.
        </p>
      </CardContent>
      <CardActions>
        <Button size='small' color='primary'>
          Share
        </Button>
        <Button size='small' color='primary'>
          Learn More
        </Button>
      </CardActions>
    </Card>
  ),
};

export const ComplexCard: Story = {
  render: () => (
    <Card style={{ maxWidth: '400px' }}>
      <CardHeader
        avatar={
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#1976d2',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
            }}
          >
            R
          </div>
        }
        action={
          <Button variant='text' size='small'>
            ⋮
          </Button>
        }
        title='User Name'
        subheader='Posted 2 hours ago'
      />
      <CardMedia
        component='div'
        height={194}
        image='https://via.placeholder.com/400x194/9c27b0/ffffff?text=Post+Image'
        alt='Post'
      />
      <CardContent>
        <p style={{ margin: 0 }}>
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests.
        </p>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant='text' size='small'>
          Like
        </Button>
        <Button variant='text' size='small'>
          Comment
        </Button>
        <Button variant='text' size='small'>
          Share
        </Button>
      </CardActions>
    </Card>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Card variant='outlined'>
      <CardContent>
        <h2 style={{ margin: '0 0 8px 0' }}>Outlined Card</h2>
        <p style={{ margin: 0 }}>This card uses the outlined variant instead of elevation.</p>
      </CardContent>
    </Card>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
      }}
    >
      <Card hoverable>
        <CardContent>
          <h3 style={{ margin: '0 0 8px 0' }}>Hoverable Card 1</h3>
          <p style={{ margin: 0, fontSize: '14px', color: 'rgba(0, 0, 0, 0.6)' }}>
            Hover over this card to see the effect
          </p>
        </CardContent>
      </Card>
      <Card hoverable>
        <CardContent>
          <h3 style={{ margin: '0 0 8px 0' }}>Hoverable Card 2</h3>
          <p style={{ margin: 0, fontSize: '14px', color: 'rgba(0, 0, 0, 0.6)' }}>
            Hover over this card to see the effect
          </p>
        </CardContent>
      </Card>
      <Card hoverable>
        <CardContent>
          <h3 style={{ margin: '0 0 8px 0' }}>Hoverable Card 3</h3>
          <p style={{ margin: 0, fontSize: '14px', color: 'rgba(0, 0, 0, 0.6)' }}>
            Hover over this card to see the effect
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};
