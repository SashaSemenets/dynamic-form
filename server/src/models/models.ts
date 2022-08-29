import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegistrationRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(63, { message: 'Must be less than 64 characters.' })
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'Only English characters are allowed.',
  })
  first_name: string;

  @IsString()
  @MaxLength(63, { message: 'Must be less than 64 characters.' })
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'Only English characters are allowed.',
  })
  middle_name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(63, { message: 'Must be less than 64 characters.' })
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'Only English characters are allowed.',
  })
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(46, { message: 'Must be less than 47 characters.' })
  @Matches(/^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/, {
    message: 'Only English characters are allowed.',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10, { message: 'Must be less than 10 characters.' })
  @MinLength(4, { message: 'Must not be less than 4 characters.' })
  @Matches(/^[0-9]+$/, { message: 'Only numbers are allowed.' })
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(15, { message: 'Must be less than 15 characters.' })
  @MinLength(8, { message: 'Must not be less than 8 characters.' })
  @Matches(/^.*[0-9].*$/, { message: '1 or more numbers.' })
  @Matches(/^.*[a-z].*$/, { message: '1 or more lower case letters.' })
  @Matches(/^.*[A-Z].*$/, { message: '1 or more upper case letters.' })
  password: string;
}
