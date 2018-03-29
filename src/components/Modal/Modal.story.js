import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import withTests from '../../util/withTests';
import Modal, { ModalProvider } from '.';
import Button from '../Button';
import Heading from '../Heading';
import { CardHeader, CardFooter } from '../Card';
import ButtonGroup from '../ButtonGroup';
import Text from '../Text';

// eslint-disable-next-line react/prop-types
const PageWithModal = ({ modal }) => (
  <ModalProvider>
    <Modal>
      {({ setModal }) => (
        <Button
          type="button"
          onClick={() => {
            setModal(modal);
          }}
        >
          Open modal
        </Button>
      )}
    </Modal>
  </ModalProvider>
);

const defaultModal = {
  // eslint-disable-next-line react/prop-types, no-unused-vars
  children: () => <div>Hello World!</div>,
  onClose: e => {
    action('Modal closed')(e);
  }
};

storiesOf('Modal', module)
  .addDecorator(withTests('Modal'))
  .add('Modal', withInfo()(() => <PageWithModal modal={defaultModal} />))
  .add(
    'Modal with title',
    withInfo()(() => {
      const modalWithTitle = {
        ...defaultModal,
        children: () => (
          <Fragment>
            <CardHeader>
              <Heading size={Heading.KILO} noMargin>
                Modal title
              </Heading>
            </CardHeader>
            <Text>Some text in the modal body.</Text>
          </Fragment>
        )
      };
      return <PageWithModal modal={modalWithTitle} />;
    })
  )
  .add(
    'Modal with close button',
    withInfo()(() => {
      const modalWithTitleAndCloser = {
        ...defaultModal,
        // eslint-disable-next-line react/prop-types
        children: ({ onClose }) => (
          <Fragment>
            <CardHeader
              onClose={e => {
                action('Close button pressed')(e);
                onClose(e);
              }}
            />
            <Text>Some text in the modal body.</Text>
          </Fragment>
        )
      };
      return <PageWithModal modal={modalWithTitleAndCloser} />;
    })
  )
  .add(
    'Modal with title and close button',
    withInfo()(() => {
      const modalWithTitle = {
        ...defaultModal,
        // eslint-disable-next-line react/prop-types
        children: ({ onClose }) => (
          <Fragment>
            <CardHeader
              onClose={e => {
                action('Close button pressed')(e);
                onClose(e);
              }}
            >
              <Heading size={Heading.KILO} noMargin>
                Modal title
              </Heading>
            </CardHeader>
            <Text>Some text in the modal body.</Text>
          </Fragment>
        )
      };
      return <PageWithModal modal={modalWithTitle} />;
    })
  )
  .add(
    'Modal with footer buttons',
    withInfo()(() => {
      const modalWithTitle = {
        ...defaultModal,
        // eslint-disable-next-line react/prop-types
        children: ({ onClose }) => (
          <Fragment>
            <CardHeader
              onClose={e => {
                action('Close button pressed')(e);
                onClose(e);
              }}
            >
              <Heading size={Heading.KILO} noMargin>
                Modal title
              </Heading>
            </CardHeader>
            <Text>Some text in the modal body.</Text>
            <CardFooter>
              <ButtonGroup>
                <Button
                  onClick={e => {
                    action('Cancel button clicked')(e);
                    onClose(e);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  primary
                  onClick={e => {
                    action('Confirm button clicked')(e);
                    onClose(e);
                  }}
                >
                  Confirm
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Fragment>
        )
      };
      return <PageWithModal modal={modalWithTitle} />;
    })
  );