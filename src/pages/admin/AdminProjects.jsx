import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  FolderGit2,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react';
import Modal from '../../components/common/Modal';
import Input from '../../components/forms/Input';
import Textarea from '../../components/forms/Textarea';
import Select from '../../components/forms/Select';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../../services/api';
import { slugify } from '../../utils/formatters';
import SEO from '../../components/common/SEO';

export const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error('Failed to load projects', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenAdd = () => {
    setEditingProject(null);
    reset({
      title: '',
      slug: '',
      tagline: '',
      category: 'Full-Stack Application',
      description: '',
      technologies: 'React.js, Node.js, Express.js, MongoDB',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      problem: '',
      solution: '',
      development: '',
      liveUrl: '',
      githubUrl: '',
      featured: false,
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    reset({
      title: project.title,
      slug: project.slug,
      tagline: project.tagline || '',
      category: project.category || 'Full-Stack Application',
      description: project.description,
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(', ')
        : project.technologies,
      thumbnail: project.thumbnail,
      problem: project.problem || '',
      solution: project.solution || '',
      development: project.development || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured || false,
      published: project.published !== false,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteProject(id);
        setProjects(projects.filter((p) => p._id !== id && p.slug !== id));
      } catch (err) {
        alert('Error deleting project');
      }
    }
  };

  const onSubmit = async (formData) => {
    setSaving(true);
    try {
      const payload = {
        ...formData,
        slug: formData.slug || slugify(formData.title),
        technologies: formData.technologies
          ? formData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
          : ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      };

      if (editingProject) {
        const updated = await updateProject(editingProject._id || editingProject.slug, payload);
        setProjects(
          projects.map((p) =>
            p._id === editingProject._id || p.slug === editingProject.slug ? updated : p
          )
        );
      } else {
        const created = await createProject(payload);
        setProjects([created, ...projects]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Save project error:', err);
      alert('Error saving project');
    } finally {
      setSaving(false);
    }
  };

  const categoryOptions = [
    { value: 'Food Ordering', label: 'Food Ordering' },
    { value: 'E-Commerce', label: 'E-Commerce' },
    { value: 'Dashboard', label: 'Dashboard' },
    { value: 'SaaS', label: 'SaaS' },
    { value: 'Business Website', label: 'Business Website' },
    { value: 'Full-Stack Application', label: 'Full-Stack Application' },
  ];

  return (
    <>
      <SEO title="Manage Projects — Admin" />

      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Project Portfolio
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Create, edit, and publish case studies dynamically on NovaStack.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Project</span>
          </button>
        </div>

        {/* Table / List */}
        {loading ? (
          <div className="py-20 text-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600" />
            <p className="mt-3 text-xs">Loading projects...</p>
          </div>
        ) : (
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Project</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Technologies</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {projects.map((proj) => (
                    <tr key={proj._id || proj.slug} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={proj.thumbnail}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                          />
                          <div>
                            <div className="font-semibold text-slate-900 truncate max-w-xs">
                              {proj.title}
                            </div>
                            <div className="text-xs text-slate-400 truncate max-w-xs">
                              /projects/{proj.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                          {proj.category}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-xs text-slate-500 truncate max-w-[200px]">
                          {Array.isArray(proj.technologies)
                            ? proj.technologies.join(', ')
                            : proj.technologies}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {proj.published !== false ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <Eye className="w-3 h-3" />
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600">
                            <EyeOff className="w-3 h-3" />
                            Draft
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(proj)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Edit Project"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(proj._id || proj.slug, proj.title)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                          title="Delete Project"
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

        {/* Project Create/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingProject ? 'Edit Project Case Study' : 'Create New Project Case Study'}
          maxWidth="max-w-3xl"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Project Title"
                required
                placeholder="e.g. OmniFood Pro"
                error={errors.title?.message}
                {...register('title', { required: 'Title is required' })}
              />
              <Input
                label="URL Slug"
                placeholder="e.g. omnifood-pro-platform"
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
                label="Hero Tagline"
                placeholder="e.g. Real-time food ordering platform..."
                {...register('tagline')}
              />
            </div>

            <Textarea
              label="Short Overview Description"
              required
              rows={3}
              placeholder="High level overview of what this application does..."
              error={errors.description?.message}
              {...register('description', { required: 'Description is required' })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Technologies (comma separated)"
                placeholder="React.js, Node.js, Express.js, MongoDB"
                {...register('technologies')}
              />
              <Input
                label="Thumbnail Image URL"
                placeholder="https://images.unsplash.com/..."
                {...register('thumbnail')}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Textarea
                label="Problem & Business Challenge"
                rows={3}
                placeholder="What problem did the client face?"
                {...register('problem')}
              />
              <Textarea
                label="Solution & Architecture"
                rows={3}
                placeholder="How did NovaStack solve it?"
                {...register('solution')}
              />
            </div>

            <Textarea
              label="Development Details & Tech Specs"
              rows={3}
              placeholder="React hooks, Express microservices, MongoDB aggregations..."
              {...register('development')}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Live Demo URL"
                placeholder="https://..."
                {...register('liveUrl')}
              />
              <Input
                label="GitHub Repository URL"
                placeholder="https://github.com/..."
                {...register('githubUrl')}
              />
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  {...register('featured')}
                />
                <span>Feature on Homepage</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  {...register('published')}
                />
                <span>Published (Visible to public)</span>
              </label>
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
                {saving ? 'Saving...' : editingProject ? 'Update Project' : 'Publish Project'}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default AdminProjects;
