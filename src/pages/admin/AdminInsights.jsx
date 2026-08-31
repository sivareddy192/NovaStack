import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  Eye,
  Loader2,
  Clock,
} from 'lucide-react';
import Modal from '../../components/common/Modal';
import Input from '../../components/forms/Input';
import Textarea from '../../components/forms/Textarea';
import Select from '../../components/forms/Select';
import {
  getInsights,
  createInsight,
  updateInsight,
  deleteInsight,
} from '../../services/api';
import { slugify } from '../../utils/formatters';
import SEO from '../../components/common/SEO';

export const AdminInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInsight, setEditingInsight] = useState(null);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await getInsights();
      setInsights(data);
    } catch (err) {
      console.error('Failed to load insights', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpenAdd = () => {
    setEditingInsight(null);
    reset({
      title: '',
      slug: '',
      category: 'Web Development',
      summary: '',
      content: '## Overview\n\nExplain technical topic here...\n\n### Key Concepts\n- Concept 1\n- Concept 2',
      readTime: '5 min read',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      tags: 'React, Node.js, Architecture',
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (article) => {
    setEditingInsight(article);
    reset({
      title: article.title,
      slug: article.slug,
      category: article.category || 'Web Development',
      summary: article.summary,
      content: article.content,
      readTime: article.readTime || '5 min read',
      coverImage: article.coverImage,
      tags: Array.isArray(article.tags) ? article.tags.join(', ') : article.tags,
      published: article.published !== false,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteInsight(id);
        setInsights(insights.filter((i) => i._id !== id && i.slug !== id));
      } catch (err) {
        alert('Error deleting article');
      }
    }
  };

  const onSubmit = async (formData) => {
    setSaving(true);
    try {
      const payload = {
        ...formData,
        slug: formData.slug || slugify(formData.title),
        tags: formData.tags
          ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : ['Web Development'],
      };

      if (editingInsight) {
        const updated = await updateInsight(editingInsight._id || editingInsight.slug, payload);
        setInsights(
          insights.map((i) =>
            i._id === editingInsight._id || i.slug === editingInsight.slug ? updated : i
          )
        );
      } else {
        const created = await createInsight(payload);
        setInsights([created, ...insights]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Save insight error:', err);
      alert('Error saving article');
    } finally {
      setSaving(false);
    }
  };

  const categoryOptions = [
    { value: 'Web Development', label: 'Web Development' },
    { value: 'MERN Stack', label: 'MERN Stack' },
    { value: 'Performance', label: 'Performance' },
    { value: 'E-Commerce', label: 'E-Commerce' },
    { value: 'UI/UX', label: 'UI/UX' },
    { value: 'SEO', label: 'SEO' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Architecture', label: 'Architecture' },
  ];

  return (
    <>
      <SEO title="Manage Insights — Admin" />

      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Engineering Insights & Articles
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Publish technical tutorials, architectural guides, and SEO thought leadership.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Article</span>
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="py-20 text-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600" />
            <p className="mt-3 text-xs">Loading articles...</p>
          </div>
        ) : (
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Article</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Read Time</th>
                    <th className="px-6 py-4">Views</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {insights.map((item) => (
                    <tr key={item._id || item.slug} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.coverImage}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                          />
                          <div>
                            <div className="font-semibold text-slate-900 truncate max-w-xs sm:max-w-md">
                              {item.title}
                            </div>
                            <div className="text-xs text-slate-400 truncate max-w-xs">
                              /insights/{item.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                          {item.category}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-indigo-600" />
                          {item.readTime || '5 min read'}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-xs font-medium text-slate-700">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-slate-400" />
                          {item.views || 0}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Edit Article"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id || item.slug, item.title)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal for Add / Edit */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingInsight ? 'Edit Insight Article' : 'Publish New Technical Article'}
          maxWidth="max-w-3xl"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Article Title"
                required
                placeholder="e.g. Scaling MERN Stack Web Applications..."
                error={errors.title?.message}
                {...register('title', { required: 'Title is required' })}
              />
              <Input
                label="URL Slug"
                placeholder="e.g. scaling-mern-stack-applications"
                {...register('slug')}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Category"
                options={categoryOptions}
                {...register('category')}
              />
              <Input
                label="Estimated Read Time"
                placeholder="e.g. 6 min read"
                {...register('readTime')}
              />
            </div>

            <Textarea
              label="Summary / Excerpt"
              required
              rows={2}
              placeholder="Brief preview snippet of the article..."
              error={errors.summary?.message}
              {...register('summary', { required: 'Summary is required' })}
            />

            <Textarea
              label="Article Content (Markdown supported: ## Heading, ### Subheading, - List item)"
              required
              rows={8}
              placeholder="Full article content..."
              error={errors.content?.message}
              {...register('content', { required: 'Content is required' })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Cover Image URL"
                required
                placeholder="https://images.unsplash.com/..."
                {...register('coverImage', { required: 'Cover image is required' })}
              />
              <Input
                label="Tags (comma separated)"
                placeholder="MERN, Node.js, MongoDB, React"
                {...register('tags')}
              />
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingInsight ? 'Update Article' : 'Publish Article'}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default AdminInsights;
