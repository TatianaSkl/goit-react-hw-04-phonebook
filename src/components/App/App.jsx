import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Section, ContactForm, ContactList, Filter, Heading } from 'components';

const LS_KEY = 'contactsLS';

export const App = () => {
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem(LS_KEY)) ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const handleAddContact = (name, number) => {
    const isExist = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
    if (isExist) {
      toast.warn(`${name} is already in contacts.`);
      return;
    }
    const newContact = { id: nanoid(), name, number };
    setContacts(prevContacts => [...prevContacts, newContact]);
    toast.success(`${name} is added to the contact list!`);
    return;
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
    toast.info(`The contact has been deleted!`);
    return;
  };

  const getFilteredContacts = () => {
    const normalizedQuery = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedQuery));
  };

  const filteredContacts = getFilteredContacts();

  return (
    <Container>
      <ToastContainer autoClose={3000} />
      <Section>
        <Heading>Phonebook</Heading>
        <ContactForm onAddContact={handleAddContact} />
      </Section>
      <Section>
        <Heading>Contacts</Heading>
        <Filter value={filter} onChange={handleFilterChange} />
        <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
      </Section>
    </Container>
  );
};
