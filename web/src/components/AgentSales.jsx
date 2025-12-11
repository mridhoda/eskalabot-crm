import React, { useState } from 'react';
import api from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function AgentSales({ agent, onUpdate }) {
    const [forms, setForms] = useState(agent.salesForms || []);
    const [isEditing, setIsEditing] = useState(false);
    const [currentForm, setCurrentForm] = useState(null);

    // Form Editor State
    const [formName, setFormName] = useState('');
    const [triggers, setTriggers] = useState('');
    const [fields, setFields] = useState('');

    const handleSave = async () => {
        if (!formName) return alert('Name is required');

        const newForm = {
            name: formName,
            triggerKeywords: triggers.split(',').map(s => s.trim()).filter(Boolean),
            fields: fields.split(',').map(s => s.trim()).filter(Boolean),
            isActive: true
        };

        let updatedForms;
        if (currentForm) {
            updatedForms = forms.map(f => f._id === currentForm._id ? { ...newForm, _id: f._id } : f);
        } else {
            updatedForms = [...forms, newForm];
        }

        try {
            const res = await api.put(`/agents/${agent._id}`, { salesForms: updatedForms });
            setForms(res.data.salesForms);
            onUpdate(res.data);
            setIsEditing(false);
            setCurrentForm(null);
        } catch (err) {
            alert('Failed to save form');
            console.error(err);
        }
    };

    const handleEdit = (form) => {
        setCurrentForm(form);
        setFormName(form.name);
        setTriggers(form.triggerKeywords.join(', '));
        setFields(form.fields.join(', '));
        setIsEditing(true);
    };

    const handleDelete = async (formId) => {
        if (!confirm('Delete this form?')) return;
        const updatedForms = forms.filter(f => f._id !== formId);
        try {
            const res = await api.put(`/agents/${agent._id}`, { salesForms: updatedForms });
            setForms(res.data.salesForms);
            onUpdate(res.data);
        } catch (err) {
            alert('Failed to delete form');
        }
    };

    const openCreate = () => {
        setCurrentForm(null);
        setFormName('');
        setTriggers('');
        setFields('');
        setIsEditing(true);
    };

    if (isEditing) {
        return (
            <div className="agent-sales-editor">
                <h3>{currentForm ? 'Edit Form' : 'Create New Form'}</h3>
                <div className="form-group">
                    <label>Form Name</label>
                    <input
                        className="input"
                        value={formName}
                        onChange={e => setFormName(e.target.value)}
                        placeholder="e.g. Order iPhone"
                    />
                </div>
                <div className="form-group">
                    <label>Trigger Keywords (comma separated)</label>
                    <textarea
                        className="textarea"
                        rows={2}
                        value={triggers}
                        onChange={e => setTriggers(e.target.value)}
                        placeholder="e.g. buy iphone, pesan iphone, order hp"
                    />
                </div>
                <div className="form-group">
                    <label>Fields to Collect (comma separated)</label>
                    <textarea
                        className="textarea"
                        rows={2}
                        value={fields}
                        onChange={e => setFields(e.target.value)}
                        placeholder="e.g. Model, Color, Capacity, Address"
                    />
                    <small className="muted">The AI will ask for these one by one.</small>
                </div>
                <div className="row" style={{ gap: 10, marginTop: 10 }}>
                    <button className="btn" onClick={handleSave}>Save Form</button>
                    <button className="btn ghost" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className="agent-sales-list">
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3>Sales Forms</h3>
                <button className="btn" onClick={openCreate}>
                    <FontAwesomeIcon icon={faPlus} /> New Form
                </button>
            </div>

            {forms.length === 0 && <p className="muted">No sales forms defined for this agent.</p>}

            <div className="sales-forms-grid">
                {forms.map((form, idx) => (
                    <div key={idx} className="card" style={{ padding: 15, marginBottom: 10, border: '1px solid #eee' }}>
                        <div className="row" style={{ justifyContent: 'space-between' }}>
                            <strong>{form.name}</strong>
                            <div className="actions">
                                <button className="btn-icon" onClick={() => handleEdit(form)}><FontAwesomeIcon icon={faEdit} /></button>
                                <button className="btn-icon" onClick={() => handleDelete(form._id)}><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                        </div>
                        <div style={{ fontSize: '0.9em', marginTop: 5 }}>
                            <div><span className="muted">Triggers:</span> {form.triggerKeywords.join(', ')}</div>
                            <div><span className="muted">Fields:</span> {form.fields.join(', ')}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
