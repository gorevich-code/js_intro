export class CreateMessageDto {
  type: 'email' | 'sms' | 'push';
  message: string;
}
