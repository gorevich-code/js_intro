import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

// Messaging service interface
interface MessagingServiceInterface {
  sendMessage(message: string): void;
}

// Email messaging service
class EmailService implements MessagingServiceInterface {
  sendMessage(message: string): void {
    console.log(`Sending email: ${message}`);
    // Code to send email
  }
}

// SMS messaging service
class SMSService implements MessagingServiceInterface {
  sendMessage(message: string): void {
    console.log(`Sending SMS: ${message}`);
    // Code to send SMS
  }
}

// Push messaging service
class PushService implements MessagingServiceInterface {
  sendMessage(message: string): void {
    console.log(`Sending Push Notification: ${message}`);
    // Code to send push notification
  }
}

// Messaging service factory
class MessagingServiceFactory {
  static getService(type: 'email' | 'sms' | 'push'): MessagingServiceInterface {
    switch (type) {
      case 'email':
        return new EmailService();
      case 'sms':
        return new SMSService();
      case 'push':
        return new PushService();
      default:
        throw new Error(`Invalid service type: ${type}`);
    }
  }
}

@Injectable()
export class MessageService {
  sendMessage(createMessageDto: CreateMessageDto) {
    try {
      const { type, message } = createMessageDto;
      const service = MessagingServiceFactory.getService(type);
      service.sendMessage(message);
      return `Message sent successfully via ${type}`;
    } catch (error) {
      return error.message;
    }
  }
}
