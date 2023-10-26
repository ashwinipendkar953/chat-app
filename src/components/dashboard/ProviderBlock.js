import { useState } from 'react';
import { auth } from '../../misc/firebase';
import { Button, Icon, Tag, Alert } from 'rsuite';
import firebase from 'firebase/app';

const ProviderBlock = () => {
  const [isConnected, setIsConnected] = useState({
    'google.com': auth.currentUser.providerData.some(
      data => data.providerId === 'google.com'
    ),
    'facebook.com': auth.currentUser.providerData.some(
      data => data.providerId === 'facebook.com'
    ),
  });

  const updateIsConnected = (providerId, value) => {
    setIsConnected(p => {
      return {
        ...p,
        [providerId]: value,
      };
    });
  };

  const unLink = async providerId => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error(`You can not disconnect from ${providerId} `);
      }
      await auth.currentUser.unlink(providerId);
      updateIsConnected(providerId, false);
      Alert.info(`Disconnected from ${providerId}`, 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  const unLinkFacebook = () => {
    unLink('facebook.com');
  };
  const unLinkGoogle = () => {
    unLink('google.com');
  };

  const link = async provider => {
    try {
      await auth.currentUser.linkWithPopup(provider);
      Alert.info(`Linked to ${provider.providerId}`, 4000);

      updateIsConnected(provider.providerId, true);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  const linkFacebook = () => {
    link(new firebase.auth.FacebookAuthProvider());
  };
  const linkGoogle = () => {
    link(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <div>
      {isConnected['google.com'] && (
        <Tag color="blue" closable onClose={unLinkGoogle}>
          <Icon icon="google" /> Connected
        </Tag>
      )}
      {isConnected['facebook.com'] && (
        <Tag color="green" closable onClose={unLinkFacebook}>
          <Icon icon="facebook" /> Connected
        </Tag>
      )}

      {!isConnected['google.com'] && (
        <div className="mt-2">
          <Button block color="blue" onClick={linkGoogle}>
            <Icon icon="google" /> Link to Google
          </Button>
        </div>
      )}
      {!isConnected['facebook.com'] && (
        <div className="mt-2">
          <Button block color="green" onClick={linkFacebook}>
            <Icon icon="facebook" /> Link to Facebook
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProviderBlock;
