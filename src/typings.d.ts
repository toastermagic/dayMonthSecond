/// <reference path="../typings/browser.d.ts" />

declare var module: {id: string};

declare var AUTH0_CLIENTID: string;
declare var AUTH0_DOMAIN: string;

interface GlobalEnvironment {
  AUTH0_CLIENTID;
  AUTH0_DOMAIN;
}

interface Global extends GlobalEnvironment  {}

interface dmsProfile extends Auth0UserProfile {
  authid_token?: string;
  firebase_token?: Auth0DelegationToken;
  firebase_auth?: any;
}

declare namespace Reflect {
  function decorate(decorators: ClassDecorator[], target: Function): Function;
  function decorate(
    decorators: (PropertyDecorator | MethodDecorator)[],
    target: Object,
    targetKey: string | symbol,
    descriptor?: PropertyDescriptor): PropertyDescriptor;

  function metadata(metadataKey: any, metadataValue: any): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
  };
  function defineMetadata(metadataKey: any, metadataValue: any, target: Object): void;
  function defineMetadata(
    metadataKey: any,
    metadataValue: any,
    target: Object,
    targetKey: string | symbol): void;
  function hasMetadata(metadataKey: any, target: Object): boolean;
  function hasMetadata(metadataKey: any, target: Object, targetKey: string | symbol): boolean;
  function hasOwnMetadata(metadataKey: any, target: Object): boolean;
  function hasOwnMetadata(metadataKey: any, target: Object, targetKey: string | symbol): boolean;
  function getMetadata(metadataKey: any, target: Object): any;
  function getMetadata(metadataKey: any, target: Object, targetKey: string | symbol): any;
  function getOwnMetadata(metadataKey: any, target: Object): any;
  function getOwnMetadata(metadataKey: any, target: Object, targetKey: string | symbol): any;
  function getMetadataKeys(target: Object): any[];
  function getMetadataKeys(target: Object, targetKey: string | symbol): any[];
  function getOwnMetadataKeys(target: Object): any[];
  function getOwnMetadataKeys(target: Object, targetKey: string | symbol): any[];
  function deleteMetadata(metadataKey: any, target: Object): boolean;
  function deleteMetadata(metadataKey: any, target: Object, targetKey: string | symbol): boolean;
}

