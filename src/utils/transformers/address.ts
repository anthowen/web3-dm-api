import type { ValidationOptions } from 'class-validator';
import { Transform } from 'class-transformer';
import { getAddress, isAddress } from 'ethers/lib/utils';
import { buildMessage, ValidateBy } from 'class-validator';

export function IsEthereumAddress(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: 'isEthereumAddress',
      validator: {
        validate: (value: string): boolean => isAddress(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property must be an Ethereum address',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}

/**
 * Transforms the address to a checksummed address and validates it.
 * @returns PropertyDecorator
 */
export function EthereumAddress(): PropertyDecorator {
  return function (target: object, propertyKey: string | symbol): void {
    Transform((v: { value: string }) => {
      try {
        if (v.value) {
          return getAddress(v.value.toLowerCase());
        }
      } catch {
        return v.value as unknown;
      }

      return v.value as unknown;
    })(target, propertyKey);
    IsEthereumAddress()(target, propertyKey);
  };
}
