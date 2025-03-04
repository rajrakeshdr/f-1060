
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import TransitionEffect from './TransitionEffect';
import Button from './Button';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    // Here you would typically handle the form submission
    // For now, we'll just reset the form
    setFormState({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <TransitionEffect animation="fade-up">
          <div className="text-center mb-16">
            <span className="inline-block mb-3 px-3 py-1 text-xs font-medium bg-background rounded-full">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's start a conversation
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a question or want to learn more about our approach? We're here to help and eager to hear from you.
            </p>
          </div>
        </TransitionEffect>

        <div className="max-w-2xl mx-auto">
          <TransitionEffect animation="fade-up" delay={300}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border bg-background/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border bg-background/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-border bg-background/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-colors"
                  placeholder="Your message"
                ></textarea>
              </div>
              
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </TransitionEffect>
        </div>
      </div>
    </section>
  );
};

export default Contact;
